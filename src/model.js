const
    model       = exports,
    url         = require('url'),
    undici      = require('undici'),
    stream      = require('stream'),
    errors      = require('@nrd/fua.core.errors'),
    strings     = require('@nrd/fua.core.strings'),
    persistence = require('@nrd/fua.module.persistence');

model.Promise     = Promise;
model.AbortSignal = AbortSignal;
model.Enum        = (...args) => Object.freeze(args);

model.Readable       = stream.Readable;
model.ReadableStream = ReadableStream;
model.Writable       = stream.Writable;

model.TermFactory = persistence.TermFactory;
model.Dataset     = persistence.Dataset;

model.UndiciDispatcher = undici.Dispatcher;
model.UndiciAgent      = undici.Agent;

model.InternalFormData = FormData;

model.URL             = url.URL;
model.URLSearchParams = url.URLSearchParams;
model.FormData        = undici.FormData;

model.Request = undici.Request;
/** @mixes ResponseMixin */
model.Response = undici.Response;
model.Headers = undici.Headers;
model.fetch   = undici.fetch;
/** @typedef {Blob | ArrayBuffer | TypedArray | DataView | FormData | URLSearchParams | string | String | ReadableStream} Body */

model.Mode           = model.Enum('cors', 'no-cors', 'same-origin', 'navigate', 'websocket');
model.Credentials    = model.Enum('omit', 'same-origin', 'include');
model.Cache          = model.Enum('default', 'no-store', 'reload', 'no-cache', 'force-cache', 'only-if-cached');
model.Redirect       = model.Enum('follow', 'error', 'manual');
model.ReferrerPolicy = model.Enum('no-referrer', 'no-referrer-when-downgrade', 'same-origin', 'origin', 'strict-origin', 'origin-when-cross-origin', 'strict-origin-when-cross-origin', 'unsafe-url');
// model.Referrer = null;

model.Method   = model.Enum('GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE');
model.Priority = model.Enum('high', 'low', 'auto');
// model.Integrity = null;

model.RequestError  = errors.http.RequestError;
model.ResponseError = errors.http.ResponseError;

model.AsyncResponse = require('./model/AsyncResponse.js');
model.RequestClient = require('./model/RequestClient.js');
model.ResponseMixin = require('./model/ResponseMixin.js');
Object.assign(model.Response.prototype, model.ResponseMixin);
