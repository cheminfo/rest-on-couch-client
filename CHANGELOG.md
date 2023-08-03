# Changelog

### [5.3.1](https://www.github.com/cheminfo/rest-on-couch-client/compare/v5.3.0...v5.3.1) (2023-08-03)


### Bug Fixes

* do not assume roc doc content is an object ([79c9025](https://www.github.com/cheminfo/rest-on-couch-client/commit/79c9025c5d1f27cb7aa50e488dd0e64272e13c12))
* move eslint deps to dev deps ([4f568c7](https://www.github.com/cheminfo/rest-on-couch-client/commit/4f568c7f55baae6fe09a5898f184c58e6a441a17))

## [5.3.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v5.2.0...v5.3.0) (2022-06-08)


### Features

* add roc.getFind to query with mango ([004f34d](https://www.github.com/cheminfo/rest-on-couch-client/commit/004f34d7376c52028133e19188cfb2a0d750d141))

## [5.2.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v5.1.0...v5.2.0) (2022-05-06)


### Features

* add axios options to all methods ([#46](https://www.github.com/cheminfo/rest-on-couch-client/issues/46)) ([d9fa6a0](https://www.github.com/cheminfo/rest-on-couch-client/commit/d9fa6a0b793cf538f86292c54d9ee43227e37b8a))

## [5.1.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v5.0.1...v5.1.0) (2022-04-27)


### Features

* add getUserInfo ([bfc94b5](https://www.github.com/cheminfo/rest-on-couch-client/commit/bfc94b52921a9a94502bcdabeb52600409bef66d))

### [5.0.1](https://www.github.com/cheminfo/rest-on-couch-client/compare/v5.0.0...v5.0.1) (2022-04-26)


### Bug Fixes

* add missing ldap properties to IGroupDocument interface ([7aeedaa](https://www.github.com/cheminfo/rest-on-couch-client/commit/7aeedaa8063d98efdc3636aa12f8e665bf6e1025))

## [5.0.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v4.3.0...v5.0.0) (2022-04-22)


### ⚠ BREAKING CHANGES

* renamed types and made split entry document and group document in separate types

### Features

* add group methods ([4a5765d](https://www.github.com/cheminfo/rest-on-couch-client/commit/4a5765d7e8aeb1add46e962a2dcb4edf6f2f3295))

## [4.3.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v4.2.3...v4.3.0) (2022-02-28)


### Features

* throw if update is called with an object which contains an _id property ([08ef68b](https://www.github.com/cheminfo/rest-on-couch-client/commit/08ef68b41abab52f353f44b9dcde905701b63491))

### [4.2.3](https://www.github.com/cheminfo/rest-on-couch-client/compare/v4.2.2...v4.2.3) (2022-02-28)


### Bug Fixes

* return type RocDocument when creating new document ([47c9e5b](https://www.github.com/cheminfo/rest-on-couch-client/commit/47c9e5b295ea1b919204d88a3aef7a5ab3fec31f))

### [4.2.2](https://www.github.com/cheminfo/rest-on-couch-client/compare/v4.2.1...v4.2.2) (2022-02-15)


### Bug Fixes

* allow Blob in browser instead of ArrayBuffer ([47a31b3](https://www.github.com/cheminfo/rest-on-couch-client/commit/47a31b36bff9e49b2cf4ed09613e70e3d5c09eb3))

### [4.2.1](https://www.github.com/cheminfo/rest-on-couch-client/compare/v4.2.0...v4.2.1) (2022-02-14)


### Bug Fixes

* include type of $id in document generic ([9eb7632](https://www.github.com/cheminfo/rest-on-couch-client/commit/9eb76323d6f1f68c97616e421cd4718e4f7de290))

## [4.2.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v4.1.0...v4.2.0) (2022-02-11)


### Features

* add option to prevent overriding attachments ([dc1be9d](https://www.github.com/cheminfo/rest-on-couch-client/commit/dc1be9d02a42c94d962c753ebc810b6f293c5226))

## [4.1.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v4.0.0...v4.1.0) (2022-02-11)


### Features

* add getRocClientError ([e0fac77](https://www.github.com/cheminfo/rest-on-couch-client/commit/e0fac772c539ce9bf847daccfe544ddb44407aa5))
* add initializeDocument api ([59b30a5](https://www.github.com/cheminfo/rest-on-couch-client/commit/59b30a52e95ae7914397bd831eb4f098d6ba8597))
* add roc.deleteDocument and doc.delete to api ([c0490d5](https://www.github.com/cheminfo/rest-on-couch-client/commit/c0490d5a3f93f8268c1a0e24b0b124baea532c1c))
* add support for blob when adding attachments and add tests ([e46a5c4](https://www.github.com/cheminfo/rest-on-couch-client/commit/e46a5c479d80e2c5c3a4eba8359d0a5474f5556c))

## [4.0.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v3.5.0...v4.0.0) (2022-02-10)


### ⚠ BREAKING CHANGES

* remove fake roc api

### Miscellaneous Chores

* update eslint config and remove fake Roc ([d220610](https://www.github.com/cheminfo/rest-on-couch-client/commit/d22061054130d2709f7c69966edf0413aa6668a2))

## [3.5.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v3.4.0...v3.5.0) (2021-11-24)


### Features

* expose `request` and `dbRequest` Axios instances ([b51a68c](https://www.github.com/cheminfo/rest-on-couch-client/commit/b51a68ce43ced8d2772f24c01f23e8c4a5cd203a))

## [3.4.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v3.3.4...v3.4.0) (2021-11-19)


### Features

* add getGroupsInfo method ([2faa78a](https://www.github.com/cheminfo/rest-on-couch-client/commit/2faa78ae77f5a73db65fd04b2b51b3883b5494df))

### [3.3.4](https://www.github.com/cheminfo/rest-on-couch-client/compare/v3.3.3...v3.3.4) (2021-11-17)


### Bug Fixes

* do not send params to rest-on-couch when they are set to undefined ([4d411e2](https://www.github.com/cheminfo/rest-on-couch-client/commit/4d411e2b62a98dcb5d91f8e9b3a74ead5ea3c8a3))

### [3.3.3](https://www.github.com/cheminfo/rest-on-couch-client/compare/v3.3.2...v3.3.3) (2021-11-15)


### Bug Fixes

* startKey and endKey should actually be startkey and endkey ([ba1c9bb](https://www.github.com/cheminfo/rest-on-couch-client/commit/ba1c9bb02f398189b854e0e4f247e9300d764e3a))

### [3.3.2](https://www.github.com/cheminfo/rest-on-couch-client/compare/v3.3.1...v3.3.2) (2021-11-02)


### Bug Fixes

* add $kind to Document interface base ([85c73eb](https://www.github.com/cheminfo/rest-on-couch-client/commit/85c73ebf91fec3e73795eec9b819072b53dd38f9))
* upgrade deps ([0432ca4](https://www.github.com/cheminfo/rest-on-couch-client/commit/0432ca40da14fecafb6d7177a9a6d1053b5efe3d))

### [3.3.1](https://www.github.com/cheminfo/rest-on-couch-client/compare/v3.3.0...v3.3.1) (2021-09-01)


### Bug Fixes

* make sure param token is always used ([23f0cc0](https://www.github.com/cheminfo/rest-on-couch-client/commit/23f0cc02de1cad8decc94cc0bee9f898f292172e))

## [3.3.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v3.2.0...v3.3.0) (2021-08-30)


### Features

* add getView to Roc ([43b560f](https://www.github.com/cheminfo/rest-on-couch-client/commit/43b560f00301415b30b1fc12e095a6b6f5ac18bf)), closes [#14](https://www.github.com/cheminfo/rest-on-couch-client/issues/14)

## [3.2.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v3.1.0...v3.2.0) (2021-08-25)


### Features

* add accessToken option ([0531a04](https://www.github.com/cheminfo/rest-on-couch-client/commit/0531a041e51a7350c79c925e691f54792610780b))

## [3.1.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v3.0.1...v3.1.0) (2021-08-10)


### Features

* add getUserGroups method ([#9](https://www.github.com/cheminfo/rest-on-couch-client/issues/9)) ([787014d](https://www.github.com/cheminfo/rest-on-couch-client/commit/787014da0a5156b75a5ac8e5566dbda84495d9db))

### [3.0.1](https://www.github.com/cheminfo/rest-on-couch-client/compare/v3.0.0...v3.0.1) (2021-08-02)


### Bug Fixes

* **types:** make include_docs lowercase as in roc API ([d9b9a84](https://www.github.com/cheminfo/rest-on-couch-client/commit/d9b9a84e1100f942ed6bd9b248ffdece9ca3e45c))

## [3.0.0](https://www.github.com/cheminfo/rest-on-couch-client/compare/v2.3.0...v3.0.0) (2021-07-28)


### ⚠ BREAKING CHANGES

* remove support for nodejs 10

### Bug Fixes

* remove crypto dependency ([9b3a304](https://www.github.com/cheminfo/rest-on-couch-client/commit/9b3a304391bef449bf2efd3b56bdc7cda597a855))


### Miscellaneous Chores

* remove support for nodejs 10 ([af1979f](https://www.github.com/cheminfo/rest-on-couch-client/commit/af1979fb20c0bd0fa1da1d5d3bf73b656ff6e1a2))

## [2.3.0](https://github.com/cheminfo/rest-on-couch-client/compare/v2.2.4...v2.3.0) (2020-12-04)


### Features

* add hasRight method on document ([c6ee61a](https://github.com/cheminfo/rest-on-couch-client/commit/c6ee61a14aff664bab8302654c510d38cd3efaf4))
* make RocDocument a generic type ([bf59c56](https://github.com/cheminfo/rest-on-couch-client/commit/bf59c5682fbeeaa39962fdee77b2ce813c854592))


### Bug Fixes

* correct computation of attachment url ([4cf5f94](https://github.com/cheminfo/rest-on-couch-client/commit/4cf5f941cf01035dc88e43c8d7445f5c24d25617))

## [2.2.4](https://github.com/cheminfo/rest-on-couch-client/compare/v2.2.1...v2.2.4) (2020-09-15)


### Bug Fixes

* add trailing / to dbUrl ([d924901](https://github.com/cheminfo/rest-on-couch-client/commit/d924901dc23152cfc924eed2d4b7a52cd8db02fe))
* ICouchUser.provider can be null ([260096c](https://github.com/cheminfo/rest-on-couch-client/commit/260096cdff6c0ea1f3da87c3384865cbc548913a))



# [2.0.0](https://github.com/cheminfo/rest-on-couch-client/compare/v1.0.0...v2.0.0) (2019-03-29)


### Features

* rethink the whole API ([#1](https://github.com/cheminfo/rest-on-couch-client/issues/1)) ([064adb2](https://github.com/cheminfo/rest-on-couch-client/commit/064adb2))



<a name="0.0.6"></a>
## [0.0.6](https://github.com/cheminfo/rest-on-couch-client/compare/v0.0.5...v0.0.6) (2018-02-07)



<a name="0.0.5"></a>
## [0.0.5](https://github.com/cheminfo/rest-on-couch-client/compare/v0.0.4...v0.0.5) (2017-02-22)



<a name="0.0.4"></a>
## [0.0.4](https://github.com/cheminfo/rest-on-couch-client/compare/v0.0.3...v0.0.4) (2017-02-09)



<a name="0.0.3"></a>
## [0.0.3](https://github.com/cheminfo/rest-on-couch-client/compare/v0.0.2...v0.0.3) (2017-01-13)



<a name="0.0.2"></a>
## [0.0.2](https://github.com/cheminfo/rest-on-couch-client/compare/v0.0.1...v0.0.2) (2016-12-19)



<a name="0.0.1"></a>
## 0.0.1 (2016-12-19)
