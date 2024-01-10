const
    assert    = require('@nrd/fua.core.assert'),
    is        = require('@nrd/fua.core.is'),
    types     = require('./types.js'),
    nodeFetch = require('node-fetch');

class HTTPClient {

    #baseUrl = 'http://localhost';
    #options = {};

    #fetch    = fetch || nodeFetch;
    #Headers  = Headers || nodeFetch.Headers;
    #Request  = Request || nodeFetch.Request;
    #Response = Response || nodeFetch.Response;

    constructor(options = {}) {
        assert.object(options, types.ClientOptions);
        assert.todo(/* TODO */);
    }

    async get(url, headers) {
        const
            request  = new this.#Request(
                new URL(url, this.#baseUrl), {
                    ...this.#options,
                    headers: headers ? new this.#Headers(headers) : undefined
                }
            ),
            response = await this.#fetch(request);

        // TODO
    }

    // TODO

}

module.exports = HTTPClient;
