const
    model  = require('../model.js'),
    util   = require('../util.js'),
    assert = require('@nrd/fua.core.assert'),
    is     = require('@nrd/fua.core.is');

class RequestClient {

    #baseUrl;
    #defaultOptions;
    #dispatchAgent;

    constructor({
                    baseUrl = null,

                    method = 'GET',
                    headers = {},
                    body = null,
                    mode = 'cors',
                    credentials = 'omit',
                    cache = 'no-store',
                    redirect = 'follow',
                    referrer = '',
                    referrerPolicy = 'no-referrer',
                    integrity = '',
                    keepalive = false,
                    signal = null,
                    priority = 'auto',

                    ...agentOptions
                } = {}) {

        this.#baseUrl        = baseUrl || undefined;
        this.#defaultOptions = {
            method, headers, body, mode, credentials, cache, redirect,
            referrer, referrerPolicy, integrity, keepalive, signal, priority
        };
        this.#dispatchAgent  = new model.UndiciAgent(agentOptions);
    }

    // fetch(url, options) {
    //     const target  = new model.URL(url, this.#baseUrl);
    //     const promise = model.fetch(target, {
    //         ...this.#defaultOptions, ...options,
    //         headers:    {...this.#defaultOptions?.headers, ...options?.headers},
    //         signal:     (this.#defaultOptions?.signal && options?.signal)
    //                         ? model.AbortSignal.any([this.#defaultOptions?.signal, options?.signal])
    //                         : this.#defaultOptions?.signal || options?.signal || null,
    //         dispatcher: this.#dispatchAgent
    //     });
    //     return new model.AsyncResponse(promise);
    // }

    fetch(url, options) {
        const target                 = new model.URL(url, this.#baseUrl);
        const {content, contentType} = util.parseBodyContent(options?.body);
        assert(is.null(options?.body) || !is.null(content), 'invalid content');
        const request = new model.Request(target, {
            ...this.#defaultOptions,
            ...options,
            headers:    contentType ? {
                'Content-Type': contentType,
                ...this.#defaultOptions?.headers,
                ...options?.headers
            } : {
                ...this.#defaultOptions?.headers,
                ...options?.headers
            },
            signal:     (this.#defaultOptions?.signal && options?.signal)
                            ? model.AbortSignal.any([this.#defaultOptions?.signal, options?.signal])
                            : this.#defaultOptions?.signal || options?.signal || null,
            body:       content,
            dispatcher: this.#dispatchAgent
        });
        return new model.AsyncRequest(request);
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

    // TODO OPTIONS? CONNECT? TRACE?

}

module.exports = RequestClient;
