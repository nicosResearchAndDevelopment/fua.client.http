const
    model  = require('../model.js'),
    assert = require('@fua/core.assert');

/**
 * @template {{}} Ext
 * @extends {Promise<Response & Ext>}
 * @mixes AsyncMixin
 */
class AsyncResponse extends model.Promise {

    static [Symbol.species] = model.Promise;

    /** @type {AbortController} */ #controller = null;

    /**
     * @param {Promise<Response>} promise
     * @param {AbortController} [controller]
     */
    constructor(promise, controller) {
        assert.instance(promise, model.Promise);
        if (controller) assert.instance(controller, model.AbortController);
        super((resolve, reject) => promise.then(((response) => {
            assert.instance(response, model.Response);
            resolve(response);
        })).catch(reject));
        if (controller) this.#controller = controller;
    }

    /** @returns {AsyncResponse<{ ok: true }>} */
    valid() {
        return new AsyncResponse(this.then((response) => {
            if (response.ok) return response;
            throw new model.ResponseError(response);
        }));
    }

    abort(reason) {
        assert(this.#controller, 'Abort is unusable', TypeError);
        this.#controller.abort(reason);
    }

}

Object.assign(AsyncResponse.prototype, model.AsyncMixin);
module.exports = AsyncResponse;
