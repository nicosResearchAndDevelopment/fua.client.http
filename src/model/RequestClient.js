const
    assert         = require('@nrd/fua.core.assert'),
    is             = require('@nrd/fua.core.is'),
    errors         = require('@nrd/fua.core.errors'),
    strings        = require('@nrd/fua.core.strings'),
    nodeFetch      = require('node-fetch'),
    ClientOptions  = require('./ClientOptions.js'),
    RequestOptions = require('./RequestOptions.js');

class RequestClient {

    /** @type {ClientOptions} */
    options = null;

    #fetch    = fetch || nodeFetch;
    #Headers  = Headers || nodeFetch.Headers;
    #Request  = Request || nodeFetch.Request;
    #Response = Response || nodeFetch.Response;

    constructor(options) {
        this.options = new ClientOptions(options);
        // TODO select the fetch method based on the need for an agent

        Object.freeze(this);
    }

    async fetch(url, options) {
        const
            param    = new RequestOptions({url, ...options}),
            target   = new URL(param.url, this.options.baseUrl),
            request  = new this.#Request(target, {...this.options, ...param}),
            response = await this.#fetch(request);
        return response;
    }

    async get(url, headers) {
        const
            param    = new RequestOptions({url, method: 'GET', headers}),
            target   = new URL(param.url, this.options.baseUrl),
            request  = new this.#Request(target, {...this.options, ...param}),
            response = await this.#fetch(request);

        if (!response.ok) throw new errors.http.ResponseError(response);
        return response;

        // TODO extract the right media-type from comparison between accept and content-type
        // resolver = util.contentResolvers[request.headers.get('Accept') || '*/*'] || util.contentResolvers['*/*'];

        // return await resolver(response);
    }

    // TODO

}

module.exports = RequestClient;
