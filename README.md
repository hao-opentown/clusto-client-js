A simple Javascript client for [Clusto](http://clusto.org/)'s HTTP API
([clusto-apiserver](https://github.com/clusto/clusto-apiserver)).

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
* [ ] [Main module](http://clusto-apiserver.readthedocs.org/clustoapi/all.html)
  * [x]  `GET /__meta__`
  * [x]  `GET /__version__`
  * [x]  `GET /__doc__`
  * [x]  `GET /by-name/<name>`
  * [x]  `GET /by-names`
  * [x]  `GET /from-pools`
  * [x]  `GET /driverlist`
  * [ ] Paging (`Clusto-Page`, `Clusto-Pages`, `Clusto-Per-Page`)
* [ ] Attribute application
  * [x] `GET /atttribute/<name>`
  * [x] `GET /atttribute/<name>/<key>`
  * [x] `GET /atttribute/<name>/<key>/<subkey>`
  * [x] `GET /atttribute/<name>/<key>/<subkey>/<number>`
  * [ ] `POST /atttribute/<name>`
  * [ ] `PUT /atttribute/<name>/<key>`
  * [ ] `PUT /atttribute/<name>/<key>/<subkey>`
  * [ ] `PUT /atttribute/<name>/<key>/<subkey>/<number>`
  * [x] `DELETE /atttribute/<name>/<key>`
  * [x] `DELETE /atttribute/<name>/<key>/<subkey>`
  * [x] `DELETE /atttribute/<name>/<key>/<subkey>/<number>`
* [ ] Entity application
  * [x] `GET /entity/`
  * [x] `GET /entity/<driver>/`
  * [x] `GET /entity/<driver>/<name>`
  * [ ] `POST /entity/<driver>`
  * [ ] `PUT /entity/<driver>/<name>`
  * [x] `DELETE /entity/<driver>/<name>`
* [ ] Resource Manager application
  * [x] `GET /resourcemanager/`
  * [x] `GET /resourcemanager/<driver>`
  * [ ] `POST /resourcemanager/<driver>`
  * [x] `GET /resourcemanager/<driver>/<manager>`
  * [ ] `POST /resourcemanager/<driver>/<manager>`
  * [x] `DELETE /resourcemanager/<driver>/<manager>`
