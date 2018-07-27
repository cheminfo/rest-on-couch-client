'use strict';

const superagent = require('superagent');
const isNode = require('detect-node');

const URL = isNode ? require('url').URL : window.URL; // eslint-disable-line import/order

const viewSearchJsonify = ['key', 'startkey', 'endkey'];
const viewSearch = [
  'limit',
  'mine',
  'group',
  'group_level',
  'descending',
  'reduce'
];
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
    this.agent = isNode ? superagent.agent() : superagent;
    this.url = new URL(this.url);
    this.databaseUrl = new URL(`db/${this.database}/`, this.url);
    this.authUrl = new URL('auth/login/couchdb', this.url);
    this.lastSuccess = 0;
  }

  _withCredentials(request) {
    return isNode
      ? request.set('Cookie', this.cookies)
      : request.withCredentials();
  }

  auth() {
    if (!this.username || !this.password) return Promise.resolve();
    if (Date.now() - this.lastSuccess < this.authTimeout) {
      return Promise.resolve();
    }
    return this.agent
      .post(this.authUrl.href)
      .send({
        username: this.username,
        password: this.password
      })
      .then((res) => {
        this.cookies = res.headers['set-cookie'];
        if (res.status === 200) {
          this.lastSuccess = Date.now();
        }
      });
  }

  async get(entry) {
    await this.auth();
    const uuid = getUuid(entry);
    const url = new URL(`entry/${uuid}`, this.databaseUrl);
    const res = await this._withCredentials(this.agent.get(url.href));
    if (res.body && res.status === 200) {
      return res.body;
    }
    return null;
  }

  async create(entry) {
    await this.auth();
    if (!entry.$kind) {
      entry.$kind = this.kind;
    }

    const url = new URL('entry', this.databaseUrl);
    const res = await this._withCredentials(
      this.agent.post(url.href).send(entry)
    );
    if (res.body && res.status <= 201) {
      entry._id = res.body.id;
      entry._rev = res.body.rev;
      return entry;
    }
    return null;
  }

  async update(entry) {
    await this.auth();
    const url = new URL(`entry/${entry._id}`, this.databaseUrl);
    const res = await this._withCredentials(
      this.agent.put(url.href).send(entry)
    );
    if (res.body && res.status === 200) {
      entry._rev = res.body.rev;
      entry.$creationDate = res.body.$creationDate;
      entry.$modificationDate = res.body.$modificationDate;
    }
    return entry;
  }

  async inlineUploads(entry, files) {
    const base64 = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.onload = function (e) {
            resolve(dataURLtoBase64(e.target.result));
          };
          reader.onerror = function () {
            return reject(new Error('Error while reading file'));
          };
          reader.readAsDataURL(file);
        });
      })
    );

    if (!entry._attachments) {
      entry._attachments = {};
    }
    for (let i = 0; i < files.length; i++) {
      entry._attachments[files[i].name] = {
        content_type: files[i].type, // eslint-disable-line camelcase
        data: base64[i]
      };
    }
    await this.update(entry);
    const updatedEntry = await this.get(entry);
    entry._attachments = updatedEntry._attachments;
    return entry;
  }

  async view(viewName, options) {
    options = options || {};
    await this.auth();
    const url = new URL(`_view/${viewName}`, this.databaseUrl);
    addSearch(url, options);
    const res = await this._withCredentials(this.agent.get(url.href));
    if (res && res.body && res.status === 200) {
      if (options.filter) {
        res.body = res.body.filter(options.filter);
      }
      if (options.sort) {
        res.body = res.body.sort(options.sort);
      }
    }
    return res.body;
  }

  async query(viewName, options) {
    await this.auth();
    let requestUrl = new URL(`_query/${viewName}`, this.databaseUrl);
    addSearch(requestUrl, options);

    const res = await this._withCredentials(this.agent.get(requestUrl.href));
    if (res && res.body && res.status === 200) {
      if (options.filter) {
        res.body = res.body.filter(options.filter);
      }
      if (options.sort) {
        res.body = res.body.sort(options.sort);
      }
    }
    return res.body;
  }

  async session() {
    await this.auth();
    let requestUrl = new URL('auth/session', this.url);
    const res = await this._withCredentials(this.agent.get(requestUrl.href));
    return res.body;
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
      requestUrl.searchParams.append(
        viewSearchJsonify[i],
        JSON.stringify(options[viewSearchJsonify[i]])
      );
    }
  }

  for (let i = 0; i < viewSearch.length; i++) {
    if (options[viewSearch[i]]) {
      requestUrl.searchParams.append(viewSearch[i], options[viewSearch[i]]);
    }
  }
}

module.exports = Roc;

function dataURLtoBase64(data) {
  let pos;
  const l = Math.min(100, data.length);
  for (let i = 0; i < l; i++) {
    if (data[i] === ';') {
      pos = i + 1;
      break;
    }
  }
  const t = data.slice(pos, pos + 7);
  if (pos && t === 'base64,') {
    pos = pos + 7;
    return data.slice(pos);
  } else {
    throw new Error('Could not parse dataurl');
  }
}
