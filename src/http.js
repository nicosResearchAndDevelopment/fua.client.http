const
    model         = require('./model.js'),
    defaultClient = new model.RequestClient();

/**
 * @param {RequestOptions & RequestAgentOptions} options
 * @returns {RequestClient}
 * @constructor
 */
function HTTP(options) {
    return new model.RequestClient(options);
}

/** @typedef {string | URL} RequestTarget */
/** @typedef {'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE'} RequestMethod */
/** @typedef {Record<string, string>} RequestHeaders */
/** @typedef {Blob | ArrayBuffer | TypedArray | DataView | FormData | URLSearchParams | string | String | ReadableStream | Readable | Dataset} RequestBody */
/** @typedef {'cors' | 'no-cors' | 'same-origin' | 'navigate' | 'websocket'} RequestMode */
/** @typedef {'omit' | 'same-origin' | 'include'} RequestCredentials */
/** @typedef {'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'} RequestCache */
/** @typedef {'follow' | 'error' | 'manual'} RequestRedirect */
/** @typedef {string | 'about:client' | ''} RequestReferrer */
/** @typedef {'no-referrer' | 'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' | 'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'} RequestReferrerPolicy */
/** @typedef {string} RequestIntegrity */
/** @typedef {'high' | 'low' | 'auto'} RequestPriority */
/** @typedef {'audio' | 'audioworklet' | 'document' | 'embed' | 'font' | 'frame' | 'iframe' | 'image' | 'manifest' | 'object' | 'paintworklet' | 'report' | 'script' | 'sharedworker' | 'style' | 'track' | 'video' | 'worker' | 'xslt' | ''} RequestDestination */
/** @typedef {{method?: RequestMethod, headers?: Headers | RequestHeaders, body?: RequestBody, mode?: RequestMode, credentials?: RequestCredentials, cache?: RequestCache, redirect?: RequestRedirect, referrer?: RequestReferrer, referrerPolicy?: RequestReferrerPolicy, integrity?: RequestIntegrity, keepalive?: boolean, signal?: AbortSignal, priority?: RequestPriority}} RequestOptions */
/** @typedef {{maxRedirections?: number, connections?: number | null, bodyTimeout?: number | null, headersTimeout?: number | null, keepAliveMaxTimeout?: number | null, keepAliveTimeout?: number | null, keepAliveTimeoutThreshold?: number | null, maxHeaderSize?: number | null, maxResponseSize?: number | null, pipelining?: number | null, connect?: RequestConnectOptions, strictContentLength?: boolean, autoSelectFamily?: boolean, autoSelectFamilyAttemptTimeout?: number, allowH2?: boolean, maxConcurrentStreams?: number}} RequestAgentOptions */
/** @typedef {{keepAlive?: boolean | null, keepAliveInitialDelay?: number | null, socketPath?: string | null, maxCachedSessions?: number | null, timeout?: number | null, servername?: string, enableTrace?: boolean, rejectUnauthorized?: boolean, minDHSize?: number, highWaterMark?: number}} RequestConnectOptions */

Object.defineProperties(HTTP, {
    /** @type {function (instance: unknown): instance is RequestClient}*/
    [Symbol.hasInstance]: {value: (instance) => (instance instanceof model.RequestClient)},
    /** @type {function (url: RequestTarget, options?: RequestOptions): AsyncRequest} */
    fetch: {value: defaultClient.fetch.bind(defaultClient)},
    /** @type {function (url: RequestTarget, headers?: RequestHeaders): AsyncRequest} */
    get: {value: defaultClient.get.bind(defaultClient)},
    /** @type {function (url: RequestTarget, headers?: RequestHeaders): AsyncRequest} */
    head: {value: defaultClient.head.bind(defaultClient)},
    /** @type {function (url: RequestTarget, headers?: RequestHeaders, body?: RequestBody): AsyncRequest} */
    post: {value: defaultClient.post.bind(defaultClient)},
    /** @type {function (url: RequestTarget, headers?: RequestHeaders, body?: RequestBody): AsyncRequest} */
    put: {value: defaultClient.put.bind(defaultClient)},
    /** @type {function (url: RequestTarget, headers?: RequestHeaders, body?: RequestBody): AsyncRequest} */
    delete: {value: defaultClient.delete.bind(defaultClient)}
    // options: {value: defaultClient.options.bind(defaultClient)},
    // connect: {value: defaultClient.connect.bind(defaultClient)},
    // trace:   {value: defaultClient.trace.bind(defaultClient)},
});

module.exports = HTTP;
