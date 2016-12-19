'use strict';
const superagent = require('superagent');
const URI = require('urijs');

const viewSearchJsonify = ['key', 'startkey', 'endkey'];
const viewSearch = ['limit', 'mine', 'groups', 'descending', 'reduce'];
const mandatoryOptions = ['url', 'database'];

class Roc {
    constructor(opts) {
        opts = opts || {};
        for (var key in opts) {
            if (opts.hasOwnProperty(key)) {
                this[key] = opts[key];
            }
        }
        for (let i = 0; i < mandatoryOptions.length; i++) {
            if (!this[mandatoryOptions[i]]) {
                throw new Error(`${mandatoryOptions[i]} is a mandatory option`);
            }
        }

        this.authTimeout = this.authTimeout || 0;
        this.agent = superagent.agent();
        this.username = encodeURIComponent(this.username);
        this.password = encodeURIComponent(this.password);
        console.log(this.username, this.password);
        this.databaseUrl = new URI(this.url).segment('db').segmentCoded(this.database).normalize().href();
        this.authUrl = new URI(this.url).segment('auth/login/couchdb').normalize().href();
        this.entryUrl = new URI(this.databaseUrl).segment('entry').normalize().href();
        this.lastSuccess = 0;
    }

    auth() {
        if (!this.username || !this.password) return Promise.resolve();
        if (Date.now() - this.lastSuccess < this.authTimeout) return Promise.resolve();
        console.log('auth expired');
        return this.agent
            .post(this.authUrl)
            .send(`username=${this.username}`)
            .send(`password=${this.password}`)
            .then(res => {
                if (res.status === 200) {
                    this.lastSuccess = Date.now()
                }
            })
            .catch(err => {
                console.error('authentification error', err.message);
                throw err;
            });
    }

    get(entry) {
        return this.auth().then(() => {
            const uuid = getUuid(entry);
            const url = new URI(this.entryUrl).segmentCoded(uuid).normalize().href();
            return this.agent.get(url)
                .then(res => {
                    if (res.body && res.status == 200) {
                        return res.body;
                    }
                });
        });
    }

    create(entry) {
        return this.auth()
            .then(() => {
                if (!entry.$kind) {
                    entry.$kind = this.kind;
                }
                return this.agent.post(this.entryUrl)
                    .send(entry)
                    .then(res => {
                        if (res.body && res.status <= 201) {
                            entry._id = res.body.id;
                            entry._rev = res.body.rev;
                            return entry;
                        }
                    });
            });
    }

    update(entry) {
        return this.auth().then(() => {
            const url = new URI(this.entryUrl).segment(entry._id).normalize().href();
            return this.agent.put(url)
                .send(entry)
                .then(res => {
                    if (res.body && res.status == 200) {
                        entry._rev = res.body.rev;
                        entry.$creationDate = res.body.$creationDate;
                        entry.$modificationDate = res.body.$modificationDate;
                    }
                    return entry;
                });
        });
    }

    view(viewName, options) {
        return this.auth().then(() => {
            let url = new URI(this.databaseUrl).segment(`_view/${viewName}`);
            addSearch(url, options);

            url = url.normalize().href();

            return this.agent.get(url)
                .then(res => {
                    if (res && res.body && res.status == 200) {
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
        return this.url().then(() => {
            let requestUrl = new URI(this.databaseUrl).segment(`_query/${viewName}`);
            addSearch(requestUrl, options);
            requestUrl = requestUrl.normalize().href();

            return this.agent.get(requestUrl)
                .then(res => {
                    if (res && res.body && res.status == 200) {
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
            requestUrl.addSearch(viewSearchJsonify[i], JSON.stringify(options[viewSearchJsonify[i]]));
        }
    }

    for (let i = 0; i < viewSearch.length; i++) {
        if (options[viewSearch[i]]) {
            requestUrl.addSearch(viewSearch[i], options[viewSearch[i]]);
        }
    }
}

module.exports = Roc;