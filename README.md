A simple Javascript client for [Clusto](http://clusto.org/)'s HTTP API
([clusto-apiserver](https://github.com/clusto/clusto-apiserver)).

```javascript
let clusto = require('clusto-client')
let client = new clusto.Client('http://clusto:9664')

client.init()
  .then(() => {
    client.get_from_pools({
      pool: ['production', 'my-service'],
      mode: clusto.Mode.EXPANDED
    })
  })
  .then((entities) => {
    console.log(entities)
  })
```

### Current Status

Work in progress.

* [ ] [Main module](http://clusto-apiserver.readthedocs.org/clustoapi/all.html)
  * [x]  `GET /__meta__`
  * [x]  `GET /__version__`
  * [x]  `GET /__doc__`
  * [x]  `GET /by-name/<name>`
  * [x]  `GET /by-names`
  * [x]  `GET /from-pools`
  * [ ] Paging (`Clusto-Page`, `Clusto-Pages`, `Clusto-Per-Page`)
* [ ] Attribute application
  * [ ] `GET /atttribute/<entity>`
  * [ ] `POST /atttribute/<entity>`
  * [ ] `PUT /atttribute/<entity>/<key>`
  * [ ] `PUT /atttribute/<entity>/<key>/<subkey>`
  * [ ] `PUT /atttribute/<entity>/<key>/<subkey>/<number>`
  * [ ] `DELETE /atttribute/<entity>/<key>`
  * [ ] `DELETE /atttribute/<entity>/<key>/<subkey>`
  * [ ] `DELETE /atttribute/<entity>/<key>/<subkey>/<number>`
* [ ] Entity application
  * [ ] `GET /entity/`
  * [ ] `GET /entity/<driver>/`
  * [ ] `GET /entity/<driver>/<entity>`
  * [ ] `POST /entity/<driver>`
  * [ ] `PUT /entity/<driver>/<entity>`
  * [ ] `DELETE /entity/<driver>/<entity>`
* [ ] Resource Manager application
