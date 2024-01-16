# @nrd/fua.client.http

## Common HTTP APIs

### Node HTTP/HTTPS

[`net`](https://nodejs.org/docs/latest-v18.x/api/net.html)
[`http`](https://nodejs.org/docs/latest-v18.x/api/http.html)
[`tls`](https://nodejs.org/docs/latest-v18.x/api/tls.html)
[`https`](https://nodejs.org/docs/latest-v18.x/api/https.html)

```ts
import {Socket} from 'node:net'
import {ClientRequest, Agent} from 'node:http'
import {SecureContext} from 'node:tls'

/**
 * @see https://nodejs.org/docs/latest-v18.x/api/http.html#httprequestoptions-callback
 * @see https://nodejs.org/docs/latest-v18.x/api/https.html#httpsrequestoptions-callback
 */
declare function request(url: string | URL, options?: RequestOptions | SecureRequestOptions, callback?: Function): ClientRequest

type RequestOptions = TCPSocketOptions & {
    agent?: Agent,
    auth?: string,
    createConnection?: () => Socket,
    defaultPort?: number,
    family?: number,
    headers?: { [key: string]: string },
    hints?: number,
    host?: string,
    hostname?: string,
    insecureHTTPParser?: boolean,
    joinDuplicateHeaders?: boolean,
    localAddress?: string,
    localPort?: string,
    lookup?: Function,
    maxHeaderSize?: number,
    method?: string,
    path?: string,
    port?: number,
    protocol?: string,
    setHost?: boolean,
    signal?: AbortSignal,
    socketPath?: string,
    timeout?: number,
    uniqueHeaders?: Array<string>
}

type SecureRequestOptions = RequestOptions & TLSSocketOptions


/** @see https://nodejs.org/docs/latest-v18.x/api/http.html#new-agentoptions */
type AgentOptions = TCPSocketOptions & {
    keepAliveMsecs?: number,
    maxSockets?: number,
    maxTotalSockets?: number,
    maxFreeSockets?: number,
    scheduling?: 'fifo' | 'lifo',
    timeout?: number
}

/** @see https://nodejs.org/docs/latest-v18.x/api/https.html#new-agentoptions */
type SecureAgentOptions = AgentOptions & TLSSocketOptions & {
    maxCachedSessions?: number
}

/**
 * @see https://nodejs.org/docs/latest-v18.x/api/net.html#netcreateconnectionoptions-connectlistener
 * @see https://nodejs.org/docs/latest-v18.x/api/net.html#new-netsocketoptions
 * @see https://nodejs.org/docs/latest-v18.x/api/net.html#socketconnectoptions-connectlistener
 */
type NetSocketOptions = {
    fd?: number,
    allowHalfOpen?: boolean,
    readable?: boolean,
    writable?: boolean,
    signal?: AbortSignal
}

/** @see https://nodejs.org/docs/latest-v18.x/api/net.html#socketconnectoptions-connectlistener */
type TCPSocketOptions = NetSocketOptions & {
    port?: number,
    host?: string,
    localAddress?: string,
    localPort?: number,
    family?: number,
    hints?: number,
    lookup?: Function,
    noDelay?: boolean,
    keepAlive?: boolean,
    keepAliveInitialDelay?: number,
    autoSelectFamily?: boolean,
    autoSelectFamilyAttemptTimeout?: number,
    onread?: {
        buffer: Buffer | Uint8Array | (() => Buffer | Uint8Array),
        callback: (nread: number, buffer: Buffer) => void | false
    }
}

/** @see https://nodejs.org/docs/latest-v18.x/api/net.html#socketconnectoptions-connectlistener */
type IPCSocketOptions = NetSocketOptions & {
    path?: string,
    onread?: {
        buffer: Buffer | Uint8Array | (() => Buffer | Uint8Array),
        callback: (nread: number, buffer: Buffer) => void | false
    }
}

/** @see https://nodejs.org/docs/latest-v18.x/api/tls.html#tlsconnectoptions-callback */
type TLSSocketOptions = TCPSocketOptions & {
    enableTrace?: boolean,
    path?: string,
    socket?: Socket,
    rejectUnauthorized?: boolean,
    pskCallback?: (hint?: string) => { psk: Buffer | TypedArray | DataView, identity: string },
    ALPNProtocols?: string[] | Buffer[] | TypedArray[] | DataView[] | Buffer | TypedArray | DataView,
    servername?: string,
    checkServerIdentity?: (servername: string, cert: CertificateObject) => void | Error,
    session?: Buffer,
    minDHSize?: number,
    highWaterMark?: number
} & ({
    secureContext?: SecureContext
} | TLSSecureContextOptions)

/** @see https://nodejs.org/docs/latest-v18.x/api/tls.html#tlscreatesecurecontextoptions */
type TLSSecureContextOptions = {
    ca?: string | Array<string> | Buffer | Array<Buffer>,
    cert: string | Array<string> | Buffer | Array<Buffer>,
    sigalgs?: string,
    ciphers?: string,
    clientCertEngine?: string,
    crl?: string | Array<string> | Buffer | Array<Buffer>,
    dhparam?: string | Buffer,
    ecdhCurve?: string,
    honorCipherOrder?: boolean
    key: string | Array<string> | Buffer | Array<Buffer>,
    privateKeyEngine?: string,
    privateKeyIdentifier?: string,
    maxVersion?: string,
    minVersion?: string,
    passphrase?: string,
    pfx?: string | Array<string> | Buffer | Array<Buffer> | { buf: string | Buffer, passphrase: string },
    secureOptions?: number,
    secureProtocol?: string,
    sessionIdContext?: string,
    ticketKeys?: Buffer,
    sessionTimeout?: number
}

/** @see https://nodejs.org/docs/latest-v18.x/api/tls.html#certificate-object */
type CertificateObject = {
    ca: boolean,
    raw: Buffer,
    subject: { [key: string]: string | Array<string> },
    issuer: { [key: string]: string | Array<string> },
    valid_from: string,
    valid_to: string,
    serialNumber: string,
    fingerprint: string,
    fingerprint256: string,
    fingerprint512: string,
    ext_key_usage?: Array<string>,
    subjectaltname?: string,
    infoAccess?: { [key: string]: Array<string> },
    issuerCertificate?: CertificateObject,
    [other: string]: any
}

type RSACertificateObject = CertificateObject & {
    bits: number,
    exponent: string,
    modulus: string,
    pubkey: Buffer
}

type ECCertificateObject = CertificateObject & {
    pubkey: Buffer,
    bits: number,
    asn1Curve?: string,
    nistCurve?: string
}
```

### Fetch API

[`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
[`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers)
[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)
[`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)

```ts
import {Agent} from 'node:http'

/** @see https://developer.mozilla.org/en-US/docs/Web/API/fetch */
declare function fetch(resource: SameOriginURL | URL | Request, options?: RequestOptions | NodeFetchRequestOptions): Promise<Response>

type SameOriginURL = string

/** @see https://developer.mozilla.org/en-US/docs/Web/API/Request */
interface Request {
    readonly body: ReadableStream
    readonly bodyUsed: boolean
    readonly cache: RequestCache
    readonly credentials: RequestCredentials
    readonly destination: RequestDestination
    readonly headers: Headers
    readonly integrity: RequestIntegrity
    readonly method: RequestMethod
    readonly mode: RequestMode
    readonly redirect: RequestRedirect
    readonly referrer: RequestReferrer
    readonly referrerPolicy: RequestReferrerPolicy
    readonly signal: AbortSignal
    readonly url: SameOriginURL

    arrayBuffer(): Promise<ArrayBuffer>
    blob(): Promise<Blob>
    formData(): Promise<FormData>
    json(): Promise<any>
    text(): Promise<string>

    clone(): Request
}

type RequestMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE'
type RequestMode = 'cors' | 'no-cors' | 'same-origin' | 'navigate' | 'websocket'
type RequestCredentials = 'omit' | 'same-origin' | 'include'
type RequestCache = 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
type RequestRedirect = 'follow' | 'error' | 'manual'
type RequestReferrer = SameOriginURL | 'about:client' | ''
type RequestReferrerPolicy = 'no-referrer' | 'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin'
    | 'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'
type RequestIntegrity = string
type RequestPriority = 'high' | 'low' | 'auto'
type RequestDestination = 'audio' | 'audioworklet' | 'document' | 'embed' | 'font' | 'frame' | 'iframe' | 'image'
    | 'manifest' | 'object' | 'paintworklet' | 'report' | 'script' | 'sharedworker' | 'style' | 'track' | 'video'
    | 'worker' | 'xslt' | ''

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/fetch#options
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options
 */
type RequestOptions = {
    method?: RequestMethod,
    headers?: Headers | { [name: HeaderName]: string },
    body?: Blob | ArrayBuffer | TypedArray | DataView | FormData | URLSearchParams | string | ReadableStream,
    mode?: RequestMode,
    credentials?: RequestCredentials,
    cache?: RequestCache,
    redirect?: RequestRedirect,
    referrer?: RequestReferrer,
    referrerPolicy?: RequestReferrerPolicy,
    integrity?: RequestIntegrity,
    keepalive?: boolean,
    signal?: AbortSignal,
    priority?: RequestPriority
}

type NodeFetchRequestOptions = RequestOptions & {
    agent?: Agent
}

/** @see https://developer.mozilla.org/en-US/docs/Web/API/Response */
interface Response {
    readonly body: ReadableStream
    readonly bodyUsed: boolean
    readonly headers: Headers
    readonly ok: boolean
    readonly redirected: boolean
    readonly status: ResponseStatus
    readonly statusText: string
    readonly type: ResponseType
    readonly url: SameOriginURL

    arrayBuffer(): Promise<ArrayBuffer>
    blob(): Promise<Blob>
    formData(): Promise<FormData>
    json(): Promise<any>
    text(): Promise<string>

    clone(): Response
}

type ResponseStatus = number
type ResponseType = 'basic' | 'cors' | 'error' | 'opaque' | 'opaqueredirect'

/** @see https://developer.mozilla.org/en-US/docs/Web/API/Headers */
interface Headers {
    has(name: HeaderName): boolean
    get(name: HeaderName): string | null
    getSetCookie(): Array<string>
    set(name: HeaderName, value: string): void
    append(name: HeaderName, value: string): void
    delete(name: HeaderName): void

    keys(): Iterator<HeaderName>
    values(): Iterator<string>
    entries(): Iterator<[HeaderName, string]>
    forEach(callbackFn: (value: string, key: HeaderName, object: Headers) => void, thisArg?: any): void
}

type HeaderName = string
```

## Client API

```ts
type FetchOptions = {
    method: null, // the method is determined by the clients methods
    headers?: { [name: string]: string }, // maybe default headers to use?
    body: null, // the body is determined by the post/put arguments
    mode: 'cors', // for serverside fetch all requests should be processed
    credentials?: RequestCredentials, // TODO
    cache: 'no-store', // generally the request should not be cached
    redirect?: RequestRedirect, // TODO
    referrer?: RequestReferrer, // TODO 
    referrerPolicy?: RequestReferrerPolicy, // TODO
    integrity: null, // the integrity might be calculated with the requests body
    keepalive?: boolean, // TODO
    signal: null, // is only relevant to cancel a request, so maybe as request options
    priority: 'auto' // is only relevant to boost a request, so maybe as request options
    // ...
}
```
