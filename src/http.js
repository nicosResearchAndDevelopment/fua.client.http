const
    util      = require('./util.js'),
    assert    = require('@nrd/fua.core.assert'),
    is        = require('@nrd/fua.core.is'),
    errors    = require('@nrd/fua.core.errors'),
    strings   = require('@nrd/fua.core.strings'),
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
            response = await this.#fetch(request),
            // TODO extract the right media-type from comparison between accept and content-type
            resolver = util.contentResolvers[request.headers.get('Accept') || '*/*'] || util.contentResolvers['*/*'];

        return await resolver(response);
    }

    // TODO

}

module.exports = HTTPClient;
