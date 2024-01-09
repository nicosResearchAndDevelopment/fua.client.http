const
    assert    = require('@nrd/fua.core.assert'),
    is        = require('@nrd/fua.core.is'),
    types     = require('./types.js'),
    nodeFetch = require('node-fetch');

class HTTPClient {

    #options = {};
    #agent   = null;
    #fetch   = fetch || nodeFetch;

    constructor(options = {}) {
        assert.object(options, types.ClientOptions);
        assert.todo(/* TODO */);
    }

    // TODO

}

module.exports = HTTPClient;
