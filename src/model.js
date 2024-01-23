const
    model   = exports,
    url     = require('url'),
    undici  = require('undici'),
    errors  = require('@nrd/fua.core.errors'),
    strings = require('@nrd/fua.core.strings');

model.Promise     = Promise;
model.AbortSignal = AbortSignal;
model.Enum        = (...args) => Object.freeze(args);

model.UndiciDispatcher = undici.Dispatcher;
model.UndiciAgent      = undici.Agent;

model.URL             = url.URL;
model.URLSearchParams = url.URLSearchParams;

model.Request  = undici.Request;
model.Response = undici.Response;
model.Headers  = undici.Headers;
model.fetch    = undici.fetch;

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
