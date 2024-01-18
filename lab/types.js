const
    types      = exports,
    {Readable} = require('stream'),
    {Agent}    = require('http'),
    is         = require('@nrd/fua.core.is'),
    strings    = require('@nrd/fua.core.strings');

types.FetchOptions = {
    method:         is.validator.optional(is.validator.enum([
        'GET',
        'HEAD',
        'POST',
        'PUT',
        'DELETE',
        'CONNECT',
        'OPTIONS',
        'TRACE'
    ])),
    headers:        is.validator.optional(is.validator.alternative([
        is.validator.instance(Headers),
        obj => is.object(obj) && Object.entries(obj).every(([key, val]) => is.string.token(key) && is.string(val))
    ])),
    body:           is.validator.optional(is.validator.alternative([
        is.validator.instance(Blob),
        is.validator.instance(ArrayBuffer),
        is.typedarray,
        is.validator.instance(DataView),
        is.validator.instance(FormData),
        is.validator.instance(URLSearchParams),
        is.string,
        is.validator.instance(String),
        is.validator.instance(ReadableStream),
        is.validator.instance(Readable)
    ])),
    mode:           is.validator.optional(is.validator.enum([
        'cors',
        'no-cors',
        'same-origin',
        'navigate',
        'websocket'
    ])),
    credentials:    is.validator.optional(is.validator.enum([
        'omit',
        'same-origin',
        'include'
    ])),
    cache:          is.validator.optional(is.validator.enum([
        'default',
        'no-store',
        'reload',
        'no-cache',
        'force-cache',
        'only-if-cached'
    ])),
    redirect:       is.validator.optional(is.validator.enum([
        'follow',
        'error',
        'manual'
    ])),
    referrer:       is.validator.optional(is.validator.alternative([
        strings.web.url.test,
        is.validator.enum([
            'about:client',
            ''
        ])
    ])),
    referrerPolicy: is.validator.optional(is.validator.enum([
        'no-referrer',
        'no-referrer-when-downgrade',
        'same-origin',
        'origin',
        'strict-origin',
        'origin-when-cross-origin',
        'strict-origin-when-cross-origin',
        'unsafe-url'
    ])),
    integrity:      is.validator.optional(is.string.token),
    keepalive:      is.validator.optional(is.boolean),
    signal:         is.validator.optional(is.validator.instance(AbortSignal)),
    priority:       is.validator.optional(is.validator.enum([
        'high',
        'low',
        'auto'
    ]))
};

// types.AgentOptions = { };

types.ClientOptions = {
    mode:           types.FetchOptions.mode,
    credentials:    types.FetchOptions.credentials,
    cache:          types.FetchOptions.cache,
    redirect:       types.FetchOptions.redirect,
    referrer:       types.FetchOptions.referrer,
    referrerPolicy: types.FetchOptions.referrerPolicy,
    keepalive:      types.FetchOptions.keepalive,
    baseUrl:        is.validator.optional(strings.web.url.test),
    agent:          is.validator.optional(is.validator.instance(Agent))
    // ... AgentOptions
};

types.RequestOptions = {
    method:    types.FetchOptions.method,
    headers:   types.FetchOptions.headers,
    body:      types.FetchOptions.body,
    integrity: types.FetchOptions.integrity,
    signal:    types.FetchOptions.signal,
    priority:  types.FetchOptions.priority
};
