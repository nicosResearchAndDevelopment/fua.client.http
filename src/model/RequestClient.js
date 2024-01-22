const
    assert         = require('@nrd/fua.core.assert'),
    is             = require('@nrd/fua.core.is'),
    errors         = require('@nrd/fua.core.errors'),
    strings        = require('@nrd/fua.core.strings'),
    http           = require('http'),
    https          = require('https'),
    nodeFetch      = require('node-fetch'),
    ClientOptions  = require('./ClientOptions.js'),
    RequestOptions = require('./RequestOptions.js'),
    AsyncResponse  = require('./AsyncResponse.js');

class RequestClient {

    /** @type {ClientOptions} */
    #param = null;
    #fetch = fetch || nodeFetch;
    // TODO instead of node-fetch with the agent options the native fetch with the dispatcher options and an undici Agent should be used
    #agent = null;

    constructor(options) {
        this.#param = new ClientOptions(options);

        // if (false) {
        //     // TODO select the fetch method based on the need for an agent
        //     this.#fetch = nodeFetch;
        //     this.#agent = new (http || https).Agent(this.#param);
        // }

        Object.freeze(this);
    }

    get(url, headers) {
        const param = new RequestOptions({url, method: 'GET', headers});
        return new AsyncResponse(this.#fetch(
            new URL(param.url, this.#param.baseUrl),
            {...this.#param, ...param, agent: this.#agent}
        ));
    }

    head(url, headers) {
        const param = new RequestOptions({url, method: 'HEAD', headers});
        return new AsyncResponse(this.#fetch(
            new URL(param.url, this.#param.baseUrl),
            {...this.#param, ...param, agent: this.#agent}
        ));
    }

    post(url, headers, body) {
        const param = new RequestOptions({url, method: 'POST', headers, body});
        return new AsyncResponse(this.#fetch(
            new URL(param.url, this.#param.baseUrl),
            {...this.#param, ...param, agent: this.#agent}
        ));
    }

    put(url, headers, body) {
        const param = new RequestOptions({url, method: 'PUT', headers, body});
        return new AsyncResponse(this.#fetch(
            new URL(param.url, this.#param.baseUrl),
            {...this.#param, ...param, agent: this.#agent}
        ));
    }

    delete(url, headers, body) {
        const param = new RequestOptions({url, method: 'DELETE', headers, body});
        return new AsyncResponse(this.#fetch(
            new URL(param.url, this.#param.baseUrl),
            {...this.#param, ...param, agent: this.#agent}
        ));
    }

    options(url, headers, body) {
        const param = new RequestOptions({url, method: 'OPTIONS', headers, body});
        return new AsyncResponse(this.#fetch(
            new URL(param.url, this.#param.baseUrl),
            {...this.#param, ...param, agent: this.#agent}
        ));
    }

    // TODO CONNECT? TRACE?

}

module.exports = RequestClient;
