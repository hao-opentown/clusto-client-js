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
