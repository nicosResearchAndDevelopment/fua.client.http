const
    model  = require('../model.js'),
    assert = require('@nrd/fua.core.assert');

/**
 * @template {{}} Ext
 * @extends {Promise<Response & Ext>}
 * @mixes AsyncMixin
 */
class AsyncResponse extends model.Promise {

    static [Symbol.species] = model.Promise;

    /** @param {Promise<Response>} promise */
    constructor(promise) {
        assert.instance(promise, model.Promise);
        super((resolve, reject) => promise.then(((response) => {
            assert.instance(response, model.Response);
            resolve(response);
        })).catch(reject));
    }

    // IDEA maybe include an AbortController as second constructor argument and add a method to abort the response
    // abort() { }

    /** @returns {AsyncResponse<{ ok: true }>} */
    valid() {
        return new AsyncResponse(this.then((response) => {
            if (response.ok) return response;
            throw new model.ResponseError(response);
        }));
    }

}

Object.assign(AsyncResponse.prototype, model.AsyncMixin);
module.exports = AsyncResponse;
