declare var URI, hyperquest, Promise, extend

export const Applications = {
  ATTRIBUTE:        'clustoapi.apps.attribute',
  ENTITY:           'clustoapi.apps.entity',
  RESOURCE_MANAGER: 'clustoapi.apps.resourcemanager'
}

export const Mode = {
  COMPACT:  'compact',
  EXPANDED: 'expanded'
}

export const Headers = {
  MODE:     'Clusto-Mode',
  PER_PAGE: 'Clusto-Per-Page',
  PAGE:     'Clusto-Page',
  PAGES:    'Clusto-Pages',
  MINIFY:   'Clusto-Minify'
}

export const AttributeType = {
  INTEGER:  'int',
  STRING:   'string',
  DATETIME: 'datetime',
  RELATION: 'relation',
  JSON:     'json'
}

export interface Attribute {
  datatype?: string
  key?: string
  number?: number
  subkey?: string
  value?: any
}

export interface Entity {
  attrs?: Attribute[]
  contents?: string[]
  driver: string
  name: string
  parents?: string[]
}

export interface RequestOptions {
  mode?: string
}

export interface FromPoolsOptions extends RequestOptions {
  pool:      string|string[]
  driver?:   string|string[]
  type?:     string|string[]
  children?: boolean
}

export class Client {

  mount_points = new Map<string, string>()
  private _base_url: any = new URI('http://localhost:9664')

  constructor(data?: any) {
    if (data) {
      if (typeof data === 'string') {
        this._base_url = new URI(data)
      } else {
        if (data.base_url) {
          this._base_url = new URI(data.base_url)
        }
      }
    }
  }

  get base_url() {
    return this._base_url.clone()
  }

  /**
   * Initialize the client, setting up the map of clusto application
   * mount points (base URL paths).
   *
   * @returns Promise
   */
  init() : any {
    return this.get_meta()
      .then(data => {
        this.mount_points.clear()
        for (let mount of Object.keys(data)) {
          let app = data[mount]
          this.mount_points.set(app, mount)
        }
      })
  }

  /**
   * @see https://github.com/clusto/clusto-apiserver/blob/master/clustoapi/server.py#L119
   */
  get_version() : any {
    return this._get('/__version__')
  }

  /**
   * @see https://github.com/clusto/clusto-apiserver/blob/master/clustoapi/server.py#L156
   */
  get_meta() : any {
    return this._get('/__meta__')
  }

  /**
   * @see https://github.com/clusto/clusto-apiserver/blob/master/clustoapi/server.py#L173
   */
  get_doc() : any {
    return this._get('/__doc__')
  }

  /**
   * @see https://github.com/clusto/clusto-apiserver/blob/master/clustoapi/server.py#L255
   */
  get_from_pools(opts: string|FromPoolsOptions) {
    let options : any = { params: {} }
    if (typeof opts === 'string') {
      options.params.pool = opts
    } else {
      options.params.pool = opts.pool
      options.params.driver = opts.driver
      options.params.children = opts.children
      options.mode = opts.mode
    }
    return this._get('/from-pools', options)
  }

  /**
   * @see https://github.com/clusto/clusto-apiserver/blob/master/clustoapi/server.py#L399
   */
  get_by_name(name: string) {
    return this._get(`/by-name/${name}`)
  }

  /**
   * @see https://github.com/clusto/clusto-apiserver/blob/master/clustoapi/server.py#L474
   */
  get_by_names() {
    return this._get('/by-names')
  }

  /**
   * @see https://github.com/clusto/clusto-apiserver/blob/master/clustoapi/server.py#L578
   */
  get_by_attr() {
    return this._get('/by-attr')
  }

  /* ----------------------------------------
     Internal helpers
     ---------------------------------------- */

  _get(path: string, options?: any) : any {
    return this._request('GET', path, options)
  }

  _request(method: string, path: string, options?: any) : any /* Promise */ {
    // Build request URL
    let url = this.base_url
      .segment(path)
      .normalizePath()

    // Set up headers
    let headers = {
      'Clusto-Minify' : true,
      'Accept' : 'application/json'
    }
    if (options && options.mode) {
      headers[Headers.MODE] = options.mode
    }

    // Query string
    if (options && options.params) {
      url.setSearch(options.params)
    }

    let req = hyperquest({
      method: method,
      uri: url.toString(),
      headers: headers
    })

    return new Promise((resolve, reject) => {
      let body = ''
      req
        .on('data', (buffer) => {
          body += buffer.toString()
        })
        .on('end', () => {
          let data = JSON.parse(body)
          resolve(data)
        })
        .on('error', (e) => {
          reject(e)
        })
    })
  }
}
