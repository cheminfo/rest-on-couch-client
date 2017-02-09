'use strict';

const superagent = require('superagent');
const URL = require('url').URL;

const viewSearchJsonify = ['key', 'startkey', 'endkey'];
const viewSearch = ['limit', 'mine', 'groups', 'descending', 'reduce'];
const mandatoryOptions = ['url', 'database'];

class Roc {
    constructor(opts) {
        opts = opts || {};
        for (const key in opts) {
            this[key] = opts[key];
        }
        for (let i = 0; i < mandatoryOptions.length; i++) {
            if (!this[mandatoryOptions[i]]) {
                throw new Error(`${mandatoryOptions[i]} is a mandatory option`);
            }
        }

        this.authTimeout = this.authTimeout || 0;
        this.agent = superagent.agent();
        this.url = new URL(this.url);
        this.databaseUrl = new URL(`db/${this.database}/`, this.url);
        this.authUrl = new URL('auth/login/couchdb', this.url);
        this.lastSuccess = 0;
    }

    auth() {
        if (!this.username || !this.password) return Promise.resolve();
        if (Date.now() - this.lastSuccess < this.authTimeout) return Promise.resolve();
        return this.agent
            .post(this.authUrl.href)
            .send({
                username: this.username,
                password: this.password
            })
            .then(res => {
                if (res.status === 200) {
                    this.lastSuccess = Date.now();
                }
            });
    }

    get(entry) {
        return this.auth().then(() => {
            const uuid = getUuid(entry);
            const url = new URL(`entry/${uuid}`, this.databaseUrl);
            return this.agent.get(url.href)
                .then(res => {
                    if (res.body && res.status === 200) {
                        return res.body;
                    }
                    return null;
                });
        });
    }

    create(entry) {
        return this.auth()
            .then(() => {
                if (!entry.$kind) {
                    entry.$kind = this.kind;
                }
                const url = new URL('entry', this.databaseUrl);
                return this.agent.post(url.href)
                    .send(entry)
                    .then(res => {
                        if (res.body && res.status <= 201) {
                            entry._id = res.body.id;
                            entry._rev = res.body.rev;
                            return entry;
                        }
                        return null;
                    });
            });
    }

    update(entry) {
        return this.auth().then(() => {
            const url = new URL(`entry/${entry._id}`, this.databaseUrl);
            return this.agent.put(url.href)
                .send(entry)
                .then(res => {
                    if (res.body && res.status === 200) {
                        entry._rev = res.body.rev;
                        entry.$creationDate = res.body.$creationDate;
                        entry.$modificationDate = res.body.$modificationDate;
                    }
                    return entry;
                });
        });
    }

    view(viewName, options) {
        options = options || {};
        return this.auth().then(() => {
            const url = new URL(`_view/${viewName}`, this.databaseUrl);
            addSearch(url, options);
            return this.agent.get(url.href)
                .then(res => {
                    if (res && res.body && res.status === 200) {
                        if (options.filter) {
                            res.body = res.body.filter(options.filter);
                        }
                        if (options.sort) {
                            res.body = res.body.sort(options.sort);
                        }
                    }
                    return res.body;
                });
        });
    }

    query(viewName, options) {
        return this.auth().then(() => {
            let requestUrl = new URL(`_query/${viewName}`, this.databaseUrl);
            addSearch(requestUrl, options);

            return this.agent.get(requestUrl.href)
                .then(res => {
                    if (res && res.body && res.status === 200) {
                        if (options.filter) {
                            res.body = res.body.filter(options.filter);
                        }
                        if (options.sort) {
                            res.body = res.body.sort(options.sort);
                        }
                    }
                    return res.body;
                });
        });
    }

}

function getUuid(entry) {
    let uuid;
    const type = typeof entry;
    if (type === 'string') {
        uuid = entry;
    } else if (type === 'object') {
        uuid = entry._id;
    } else {
        throw new Error('Bad arguments');
    }
    return uuid;
}

function addSearch(requestUrl, options) {
    for (let i = 0; i < viewSearchJsonify.length; i++) {
        if (options[viewSearchJsonify[i]]) {
            requestUrl.searchParams.append(viewSearchJsonify[i], JSON.stringify(options[viewSearchJsonify[i]]));
        }
    }

    for (let i = 0; i < viewSearch.length; i++) {
        if (options[viewSearch[i]]) {
            requestUrl.searchParams.append(viewSearch[i], options[viewSearch[i]]);
        }
    }
}

module.exports = Roc;
