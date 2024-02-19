const
    util   = require('../util.js'),
    model  = require('../model.js'),
    assert = require('@nrd/fua.core.assert'),
    is     = require('@nrd/fua.core.is');

/**
 * @extends {Promise<Response>}
 * @mixes AsyncMixin
 */
class AsyncRequest extends model.Promise {

    static [Symbol.species] = model.Promise;

    /** @type {Request | null} */ #request = null;

    /** @param {Request} initialRequest */
    constructor(initialRequest) {
        assert.instance(initialRequest, model.Request);
        super((resolve, reject) => process.nextTick(() => {
            const finalRequest = this.#request;
            this.#request      = null;
            model.fetch(finalRequest).then(resolve).catch(reject);
        }));
        this.#request = initialRequest;
    }

    /**
     * @param {string} method
     * @returns {this}
     */
    method(method) {
        assert(this.#request, 'request already fetching');
        assert(model.Method.includes(method), 'invalid method');
        this.#request = new model.Request(this.#request, {method});
        return this;
    }

    /**
     *
     * @param {string | Record<string, string>} field
     * @param {string} [value]
     * @returns {this}
     */
    header(field, value) {
        assert(this.#request, 'request already fetching');
        if (is.null(value)) {
            assert(is.object(field), 'invalid header field');
            for (let key in field) {
                this.header(key, field[key]);
            }
        } else {
            assert(is.string.nonempty(field), 'invalid header field');
            assert(is.string(value) || is.array.strings(value), 'invalid header value');
            this.#request.headers.set(field, value);
        }
        return this;
    }

    /**
     * @param {string} value
     * @returns {this}
     */
    type(value) {
        assert(this.#request, 'request already fetching');
        assert(is.string.nonempty(value), 'invalid content-type value');
        const contentType = model.MediaType(value);
        this.#request.headers.set('Content-Type', contentType);
        return this;
    }

    /**
     * @param {string} value
     * @param {number} [weight]
     * @returns {this}
     */
    accept(value, weight) {
        assert(this.#request, 'request already fetching');
        assert(is.string.nonempty(value), 'invalid accept value');
        assert(is.null(weight) || is.number(weight) && weight >= 0 && weight <= 1, 'invalid accept weight');
        const accept = model.MediaType(value, {
            'q': is.null(weight) ? null : weight.toFixed(3).replace(/\.?0+$/, '')
        });
        this.#request.headers.append('Accept', accept);
        return this;
    }

    /**
     * @param {string} name
     * @param {string} value
     * @param {Record<string, string>} [options]
     * @returns {this}
     */
    cookie(name, value, options) {
        assert(this.#request, 'request already fetching');
        assert(is.string.token(name), 'invalid cookie name');
        assert(is.string(value), 'invalid cookie value');
        assert(is.null(options) || is.object(options), 'invalid cookie options');
        util.setCookie(this.#request.headers, {name, value, ...options});
        return this;
    }

    /**
     * @param {Blob | ArrayBuffer | TypedArray | DataView | FormData | URLSearchParams | string | String | ReadableStream | Dataset} body
     * @returns {this}
     */
    send(body) {
        assert(this.#request, 'request already fetching');
        assert(!this.#request.body, 'body already defined');
        const {content, contentType} = util.parseBodyContent(body);
        assert(!is.null(content), 'invalid content');
        this.#request = new model.Request(this.#request, (this.#request.headers.has('Content-Type') || !contentType) ? {
            body: content
        } : {
            headers: {'Content-Type': contentType},
            body:    content
        });
        return this;
    }

    /** @returns {AsyncResponse<{ ok: true }>} */
    valid() {
        return new model.AsyncResponse(this.then((response) => {
            if (response.ok) return response;
            throw new model.ResponseError(response);
        }));
    }

}

Object.assign(AsyncRequest.prototype, model.AsyncMixin);
module.exports = AsyncRequest;
