'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var hyperquest = require('hyperquest');
var URI = require('URIjs');
var Promise = require('bluebird');
/* -----------------------------------------------------------------------------
   API Constants
   ----------------------------------------------------------------------------- */
var Applications = {
    ATTRIBUTE: 'clustoapi.apps.attribute',
    ENTITY: 'clustoapi.apps.entity',
    RESOURCE_MANAGER: 'clustoapi.apps.resourcemanager'
};
exports.Applications = Applications;
var Mode = {
    COMPACT: 'compact',
    EXPANDED: 'expanded'
};
exports.Mode = Mode;
var Headers = {
    MODE: 'Clusto-Mode',
    PER_PAGE: 'Clusto-Per-Page',
    PAGE: 'Clusto-Page',
    PAGES: 'Clusto-Pages',
    MINIFY: 'Clusto-Minify'
};
exports.Headers = Headers;
var AttributeType = {
    INTEGER: 'int',
    STRING: 'string',
    DATETIME: 'datetime',
    RELATION: 'relation',
    JSON: 'json'
};
exports.AttributeType = AttributeType;
/* -----------------------------------------------------------------------------
   Client
   ----------------------------------------------------------------------------- */

var Client = (function () {
    function Client(data) {
        _classCallCheck(this, Client);

        this.mount_points = new Map();
        this._base_url = new URI('http://localhost:9664');
        /* --------------------------------------------------
           Attribute module
           -------------------------------------------------- */
        this.attribute = {
            __proto__: this,
            app: Applications.ATTRIBUTE,
            /**
             * @see http://clusto-apiserver.readthedocs.org/clustoapi/apps/all.html#clustoapi.apps.attribute.attrs
             */
            get: function get(opts) {
                var path = new URI();
                if (typeof opts === 'string') {
                    path.segment(opts); /* name */
                } else {
                    path.segment(opts.name);
                    if (opts.key) {
                        path.segment(opts.key);
                    }
                    if (opts.subkey) {
                        path.segment(opts.subkey);
                    }
                    if (opts.number) {
                        path.segment(opts.number);
                    }
                }
                return this._get(path.toString(), {
                    app: this.app
                });
            },
            /**
             * @see http://clusto-apiserver.readthedocs.org/clustoapi/apps/all.html#clustoapi.apps.attribute.del_attrs
             */
            'delete': function _delete(opts) {
                var path = new URI().segment(opts.name).segment(opts.key);
                if (opts.subkey) {
                    path.segment(opts.subkey);
                }
                if (opts.number) {
                    path.segment(opts.number);
                }
                return this._delete(path.toString(), {
                    app: this.app
                });
            }
        };
        /* --------------------------------------------------
           Entity module
           -------------------------------------------------- */
        this.entity = {
            __proto__: this,
            app: Applications.ENTITY,
            /**
             * @see http://clusto-apiserver.readthedocs.org/clustoapi/apps/all.html#clustoapi.apps.entity.list
             * @see http://clusto-apiserver.readthedocs.org/clustoapi/apps/all.html#clustoapi.apps.entity.show
             */
            get: function get(opts) {
                var path = new URI();
                var options = typeof opts === 'string' ? { driver: opts } : opts || {};
                if (options.driver) {
                    path.segment(options.driver);
                }
                if (options.name) {
                    path.segment(options.name);
                }
                return this._get(path.toString(), {
                    app: this.app,
                    mode: options.mode
                });
            },
            /**
             * @see http://clusto-apiserver.readthedocs.org/clustoapi/apps/all.html#clustoapi.apps.entity.delete
             */
            'delete': function _delete(opts) {
                var path = new URI().segment(opts.driver).segment(opts.name);
                return this._delete(path.toString(), {
                    app: this.app
                });
            }
        };
        /* --------------------------------------------------
           Resource manager module
           -------------------------------------------------- */
        this.resource = {
            __proto__: this,
            app: Applications.RESOURCE_MANAGER,
            /**
             * @see http://clusto-apiserver.readthedocs.org/clustoapi/apps/all.html#clustoapi.apps.resourcemanager.list
             * @see http://clusto-apiserver.readthedocs.org/clustoapi/apps/all.html#clustoapi.apps.resourcemanager.show
             */
            get: function get(opts) {
                var path = new URI();
                var options = typeof opts === 'string' ? { driver: opts } : opts || {};
                if (options.driver) {
                    path.segment(options.driver);
                }
                if (options.manager) {
                    path.segment(options.manager);
                }
                return this._get(path.toString(), {
                    app: this.app,
                    mode: options.mode
                });
            },
            /**
             * @see http://clusto-apiserver.readthedocs.org/clustoapi/apps/all.html#clustoapi.apps.resourcemanager.deallocate
             */
            'delete': function _delete(opts) {
                var path = new URI().segment(opts.driver).segment(opts.manager);
                return this._delete(path.toString(), {
                    app: this.app
                });
            }
        };
        if (data) {
            if (typeof data === 'string') {
                this._base_url = new URI(data);
            } else {
                if (data.base_url) {
                    this._base_url = new URI(data.base_url);
                }
            }
        }
    }

    _createClass(Client, [{
        key: 'base_url',
        get: function () {
            return this._base_url.clone();
        }
    }, {
        key: 'init',

        /**
         * Initialize the client, setting up the map of clusto application
         * mount points (base URL paths).
         *
         * @returns Promise
         */
        value: function init() {
            var _this = this;

            return this.get_meta().then(function (data) {
                _this.mount_points.clear();
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var mount = _step.value;

                        var app = data[mount];
                        _this.mount_points.set(app, mount);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            });
        }
    }, {
        key: 'get_version',

        /* --------------------------------------------------
           Main module
           -------------------------------------------------- */
        /**
         * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.version
         */
        value: function get_version() {
            return this._get('/__version__');
        }
    }, {
        key: 'get_meta',

        /**
         * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.meta
         */
        value: function get_meta() {
            return this._get('/__meta__');
        }
    }, {
        key: 'get_doc',

        /**
         * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.build_docs
         */
        value: function get_doc() {
            return this._get('/__doc__');
        }
    }, {
        key: 'get_driverlist',

        /**
         * @see
         */
        value: function get_driverlist() {
            return this._get('/driverlist');
        }
    }, {
        key: 'get_from_pools',

        /**
         * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.get_from_pools
         */
        value: function get_from_pools(opts) {
            var options = { params: {} };
            if (typeof opts === 'string') {
                options.params.pool = opts;
            } else {
                options.params.pool = opts.pool;
                options.params.driver = opts.driver;
                options.params.children = opts.children;
                options.mode = opts.mode;
            }
            return this._get('/from-pools', options);
        }
    }, {
        key: 'get_by_name',

        /**
         * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.get_by_name
         */
        value: function get_by_name(opts) {
            var options = { params: {} };
            var name = null;
            if (typeof opts === 'string') {
                name = opts;
            } else {
                name = opts.name;
                if (opts.mode) {
                    options.mode = opts.mode;
                }
                if (opts.driver) {
                    options.params.driver = opts.driver;
                }
            }
            return this._get('/by-name/' + name, options);
        }
    }, {
        key: 'get_by_names',

        /**
         * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.get_by_names
         */
        value: function get_by_names(opts) {
            var options = { params: {} };
            if (opts instanceof Array) {
                options.params.name = opts;
            } else {
                var bno = opts;
                options.params.name = bno.names;
                if (bno.mode) {
                    options.mode = bno.mode;
                }
            }
            return this._get('/by-names', options);
        }
    }, {
        key: 'get_by_attr',

        /**
         * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.get_by_attr
         */
        value: function get_by_attr(opts) {
            var options = { params: {} };
            if (typeof opts === 'string') {
                options.params.key = opts;
            } else {
                options.params.key = opts.key;
                if (opts.subkey) {
                    options.params.subkey = opts.subkey;
                }
                if (opts.value) {
                    options.params.value = opts.value;
                }
            }
            return this._get('/by-attr', options);
        }
    }, {
        key: '_get',

        /* ----------------------------------------
           Internal helpers
           ---------------------------------------- */
        value: function _get(path, options) {
            return this._request('GET', path, options);
        }
    }, {
        key: '_delete',
        value: function _delete(path, options) {
            return this._request('DELETE', path, options);
        }
    }, {
        key: '_request',
        value: function _request(method, path, options) {
            // Build request URL
            var url = this.base_url;
            if (options && options.app) {
                url.segment(this.mount_points.get(options.app));
            }
            url.segment(path).normalizePath();
            // Set up headers
            var headers = {
                'Clusto-Minify': true,
                'Accept': 'application/json'
            };
            if (options && options.mode) {
                headers[Headers.MODE] = options.mode;
            }
            // Query string
            if (options && options.params) {
                url.setSearch(options.params);
            }
            var req = hyperquest({
                method: method,
                uri: url.toString(),
                headers: headers
            });
            return new Promise(function (resolve, reject) {
                var body = '';
                req.on('data', function (buffer) {
                    body += buffer.toString();
                }).on('end', function () {
                    var data = JSON.parse(body);
                    resolve(data);
                }).on('error', function (e) {
                    reject(e);
                });
            });
        }
    }]);

    return Client;
})();

exports.Client = Client;

//# sourceMappingURL=clusto-client.js.map
//# sourceMappingURL=clusto-client.js.map