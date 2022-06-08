# rest-on-couch-client

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Rest-on-couch client for Node.js and browsers.

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/rest-on-couch-client.svg
[npm-url]: https://npmjs.org/package/rest-on-couch-client
[ci-image]: https://github.com/cheminfo/rest-on-couch-client/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/cheminfo/rest-on-couch-client/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/rest-on-couch-client.svg
[download-url]: https://npmjs.org/package/rest-on-couch-client

## Run tests

### Locally

```bash
docker-compose up -d --build
npm t
```

### Compatibility between client and server

| rest-on-couch version | roc client version | New supported features  |
| --------------------- | ------------------ | -----------------------
| v12                   | v5.2.0             | -                       |
| v13                   | v5.3.0             | find API (mango queries)|

### In github actions

To update the image github actions is using

```bash
docker login ghcr.io # use your username and a token with packages write access
docker build --pull rest-on-couch -t ghcr.io/cheminfo/rest-on-couch-client:latest
docker push ghcr.io/cheminfo/rest-on-couch-client:latest
```
