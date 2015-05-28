A simple Javascript client for [Clusto](http://clusto.org/)'s HTTP API
([clusto-apiserver](https://github.com/clusto/clusto-apiserver)).

### Clusto API Server Compatibility

This library requires `clusto-apiserver` version `0.4.0` or later.

### Installation

```
npm install clusto-client
```

The library and its dependencies are compatible with
[browserify](http://browserify.org/).

### Usage

All API methods return [Promises/A+](https://promisesaplus.com/)
compatible promises via
[Bluebird](https://github.com/petkaantonov/bluebird). Because the
clusto API can be configured to re-map all the attribute, entity, and
resource manager calls to arbitrary path prefixes, the `init()` method
must be called before calling any of those API methods.

```javascript
let clusto = require('clusto-client')
let client = new clusto.Client('http://clusto:9664')

client.init()
  .then(() => {
    client.get_from_pools({
      pool: ['production', 'my-service'],
      mode: clusto.Mode.EXPANDED
    })
    .then((entities) => {
      console.log(entities)
    })
  })
```

### Current Status

Work in progress.

* [x] Packaging
  * [x] publish on npm
* [ ] localStorage caching for `__meta__` data.
* [ ] error handling
* [ ] non-JSON content handling (for __doc__)
* [ ] unit tests
* [x] Update for 0.4 API changes
* [ ] [Main module](http://clusto-apiserver.readthedocs.org/clustoapi/all.html)
  * [x] `GET /__meta__`
  * [x] `GET /__version__`
  * [x] `GET /__doc__`
  * [x] `GET /by-name/<name>`
  * [x] `GET /by-names`
  * [x] `GET /from-pools`
  * [x] `GET /driverlist`
  * [x] `Clusto-Page`, `Clusto-Per-Page` in request
  * [ ] `Clusto-Pages` in response
    * responses that can be paged should return the data in a wrapper
      that includes the value from the `Clusto-Pages` header, not just
      the raw body.
* [x] Attribute application
  * [x] `GET /atttribute/<name>`
  * [x] `GET /atttribute/<name>/<key>`
  * [x] `GET /atttribute/<name>/<key>/<subkey>`
  * [x] `GET /atttribute/<name>/<key>/<subkey>/<number>`
  * [x] `POST /atttribute/<name>`
  * [x] `PUT /atttribute/<name>/<key>`
  * [x] `PUT /atttribute/<name>/<key>/<subkey>`
  * [x] `PUT /atttribute/<name>/<key>/<subkey>/<number>`
  * [x] `DELETE /atttribute/<name>/<key>`
  * [x] `DELETE /atttribute/<name>/<key>/<subkey>`
  * [x] `DELETE /atttribute/<name>/<key>/<subkey>/<number>`
* [x] Entity application
  * [x] `GET /entity/`
  * [x] `GET /entity/<driver>/`
  * [x] `GET /entity/<driver>/<name>`
  * [x] `POST /entity/<driver>`
  * [x] `PUT /entity/<driver>/<name>`
  * [x] `DELETE /entity/<driver>/<name>`
* [x] Resource Manager application
  * [x] `GET /resourcemanager/`
  * [x] `GET /resourcemanager/<driver>`
  * [x] `POST /resourcemanager/<driver>`
  * [x] `GET /resourcemanager/<driver>/<manager>`
  * [x] `POST /resourcemanager/<driver>/<manager>`
  * [x] `DELETE /resourcemanager/<driver>/<manager>`
