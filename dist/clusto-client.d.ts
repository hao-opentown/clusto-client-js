export declare const Applications: {
    ATTRIBUTE: string;
    ENTITY: string;
    RESOURCE_MANAGER: string;
};
export declare const Mode: {
    COMPACT: string;
    EXPANDED: string;
};
export declare const Headers: {
    MODE: string;
    PER_PAGE: string;
    PAGE: string;
    PAGES: string;
    MINIFY: string;
};
export declare const AttributeType: {
    INTEGER: string;
    STRING: string;
    DATETIME: string;
    RELATION: string;
    JSON: string;
};
export interface Attribute {
    datatype?: string;
    key?: string;
    number?: number;
    subkey?: string;
    value?: any;
}
export interface Entity {
    attrs?: Attribute[];
    contents?: string[];
    driver: string;
    name: string;
    parents?: string[];
}
export interface RequestOptions {
    mode?: string;
    page?: number;
    per_page?: number;
}
export interface FromPoolsOptions extends RequestOptions {
    pool: string | string[];
    driver?: string | string[];
    type?: string | string[];
    children?: boolean;
}
export interface ByNameOptions extends RequestOptions {
    name: string;
    driver?: string;
}
export interface ByNamesOptions extends RequestOptions {
    names: string | string[];
}
export interface ByAttrOptions extends RequestOptions {
    key: string;
    subkey?: string;
    value?: any;
}
export interface AttributeGetOptions extends RequestOptions {
    name?: string;
    key?: string;
    subkey?: string;
    number?: number;
}
export interface AttributeSetOptions extends RequestOptions {
    name: string;
    key: string;
    value: any;
    subkey?: string;
    number?: number;
}
export interface AttributeDeleteOptions extends RequestOptions {
    name: string;
    key: string;
    subkey?: string;
    number?: number;
}
export interface EntityGetOptions extends RequestOptions {
    driver?: string;
    name?: string;
}
export interface EntityCreateOptions extends RequestOptions {
    driver: string;
    name: string | string[];
}
export interface EntityInsertOptions extends RequestOptions {
    driver: string;
    name: string;
    device: string | string[];
}
export interface EntityDeleteOptions extends RequestOptions {
    driver: string;
    name: string;
}
export interface ResourceGetOptions extends RequestOptions {
    driver?: string;
    manager?: string;
}
export interface ResourceCreateOptions extends RequestOptions {
    driver: string;
    name: string;
    params?: {
        [index: string]: any;
    };
}
export interface ResourceAllocateOptions extends RequestOptions {
    manager: string;
    driver: string;
    object?: string;
    resource?: string;
}
export interface ResourceDeleteOptions extends RequestOptions {
    driver: string;
    manager: string;
}
export declare class Client {
    mount_points: Map<string, string>;
    private _base_url;
    constructor(data?: any);
    base_url: any;
    /**
     * Initialize the client, setting up the map of clusto application
     * mount points (base URL paths).
     *
     * @returns Promise
     */
    init(): any;
    /**
     * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.version
     */
    get_version(): any;
    /**
     * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.meta
     */
    get_meta(): any;
    /**
     * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.build_docs
     */
    get_doc(): any;
    /**
     * @see
     */
    get_driverlist(): any;
    /**
     * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.get_from_pools
     */
    get_from_pools(opts: string | FromPoolsOptions): any;
    /**
     * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.get_by_name
     */
    get_by_name(opts: string | ByNameOptions): any;
    /**
     * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.get_by_names
     */
    get_by_names(opts: string[] | ByNamesOptions): any;
    /**
     * @see http://clusto-apiserver.readthedocs.org/clustoapi/all.html#clustoapi.server.get_by_attr
     */
    get_by_attr(opts: string | ByAttrOptions): any;
    attribute: {
        __proto__: Client;
        app: string;
        get(opts: string | AttributeGetOptions): any;
        add(opts: AttributeSetOptions): any;
        set(opts: AttributeSetOptions): any;
        delete(opts: AttributeDeleteOptions): any;
    };
    entity: {
        __proto__: Client;
        app: string;
        get(opts?: string | EntityGetOptions): any;
        create(opts: EntityCreateOptions): any;
        insert(opts: EntityInsertOptions): any;
        remove(opts: EntityInsertOptions): any;
        delete(opts: EntityDeleteOptions): any;
    };
    resource: {
        __proto__: Client;
        app: string;
        get(opts?: string | ResourceGetOptions): any;
        create(opts: ResourceCreateOptions): any;
        allocate(opts: ResourceAllocateOptions): any;
        deallocate(opts: ResourceDeleteOptions): any;
    };
    _get(path: string, options?: any): any;
    _delete(path: string, options?: any): any;
    _post(path: string, options?: any): any;
    _put(path: string, options?: any): any;
    _request(method: string, path: string, options?: any): any;
}
