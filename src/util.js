const
    util   = exports,
    model  = require('./model.js'),
    assert = require('@fua/core.assert'),
    is     = require('@fua/core.is'),
    rdf    = require('@fua/module.rdf'),
    undici = require('undici');

util.getCookies    = undici.getCookies;
util.getSetCookies = undici.getSetCookies;
util.setCookie     = undici.setCookie;
util.deleteCookie  = undici.deleteCookie;

/**
 * TODO this should simplify requests with auto-detection of content-types and auto-parsing of the content
 * NOTE this is experimental and currently untested and unused
 * Any body that you want to add to your request:
 * this can be a Blob, an ArrayBuffer, a TypedArray, a DataView, a FormData,
 * a URLSearchParams, string object or literal, or a ReadableStream object.
 * @param {unknown} data
 * @returns {{contentType?: string, content: Blob | ArrayBuffer | TypedArray | DataView | FormData | URLSearchParams | string | ReadableStream | null}}
 */
util.parseBodyContent = function (data) {
    if (is.string(data)) return {
        contentType: 'text/plain',
        content:     data
    };
    if (data instanceof Blob) return {
        contentType: data.type || undefined,
        content:     data
    };
    if ((data instanceof Buffer) || (data instanceof ArrayBuffer) || is.typedarray(data)) return {
        contentType: 'application/octet-stream',
        content:     data
    };
    if ((data instanceof model.FormData) || (data instanceof model.InternalFormData)) return {
        contentType: Array.from(data.values()).every(is.string)
                         ? 'application/x-www-form-urlencoded'
                         : 'multipart/form-data',
        content:     data
    };
    if (data instanceof model.URLSearchParams) return {
        contentType: 'application/x-www-form-urlencoded',
        content:     data
    };
    if (is.object(data) && is.function(data.toJSON)) return {
        contentType: 'application/json',
        content:     JSON.stringify(data.toJSON())
    };
    if (is.object.native(data)) return {
        contentType: ('@context' in data)
                         ? 'application/ld+json'
                         : 'application/json',
        content:     JSON.stringify(data)
    };
    if (data instanceof model.Dataset) return {
        contentType: 'text/turtle',
        content:     rdf.serializeStream(data.toStream(), 'text/turtle', data.factory)
    };
    return {
        contentType: undefined,
        content:     null
    };
};
