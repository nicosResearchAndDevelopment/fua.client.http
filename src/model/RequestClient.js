const
    model  = require('../model.js'),
    assert = require('@nrd/fua.core.assert'),
    is     = require('@nrd/fua.core.is');

class RequestClient {

    /** @type {UndiciDispatcher} */ #dispatcher;
    /** @type {Record<string, any>} */ #options = {};

    constructor(options) {
        this.#dispatcher = new model.UndiciAgent(options);

        // this.#options.mode        = options?.mode ?? 'cors';
        // this.#options.credentials = options?.credentials ?? 'omit';
        // this.#options.cache       = options?.cache ?? 'no-store';
        // this.#options.redirect    = options?.redirect ?? 'follow';

        // TODO options.referrer
        // TODO options.referrerPolicy
        // TODO validate options
    }

    fetch(url, options) {
        return new model.AsyncResponse(model.fetch(url, {
            ...this.#options, ...options,
            dispatcher: this.#dispatcher
        }));
    }

    get(url, headers) {
        return this.fetch(url, {
            method:  'GET',
            headers: headers
        });
    }

    head(url, headers) {
        return this.fetch(url, {
            method:  'HEAD',
            headers: headers
        });
    }

    post(url, headers, body) {
        return this.fetch(url, {
            method:  'POST',
            headers: headers,
            body:    body
        });
    }

    put(url, headers, body) {
        return this.fetch(url, {
            method:  'PUT',
            headers: headers,
            body:    body
        });
    }

    delete(url, headers, body) {
        return this.fetch(url, {
            method:  'DELETE',
            headers: headers,
            body:    body
        });
    }

    options(url, headers, body) {
        return this.fetch(url, {
            method:  'OPTIONS',
            headers: headers,
            body:    body
        });
    }

    // TODO CONNECT? TRACE?

}

module.exports = RequestClient;
