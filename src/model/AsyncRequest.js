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

    /** @type {Request} */ #request = null;

    /** @param {Request} request */
    constructor(request) {
        assert.instance(request, model.Request);
        super((resolve, reject) => process.nextTick(() => model.fetch(this.#request).then(resolve).catch(reject)));
        this.#request = request;
    }

    method(method) {
        assert(model.Method.includes(method), 'invalid method');
        this.#request = new model.Request(this.#request, {method});
        return this;
    }

    header(field, value) {
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

    contentType(value) {
        assert(is.string.nonempty(value), 'invalid content-type value');
        const contentType = model.ContentType(value) || value;
        this.#request.headers.set('Content-Type', contentType);
        return this;
    }

    accept(value, weight) {
        assert(is.string.nonempty(value), 'invalid accept value');
        let accept = model.ContentType(value) || value;
        if (!is.null(weight)) {
            assert(is.number(weight) && weight >= 0 && weight <= 1, 'invalid accept weight');
            accept += ';q=' + weight.toFixed(3).replace(/\.?0+$/, '');
        }
        this.#request.headers.append('Accept', accept);
        return this;
    }

    cookie(name, value, options) {
        const setCookie = model.Cookie(name, value, options);
        this.#request.headers.append('Set-Cookie', setCookie);
        return this;
    }

    send(body) {
        assert(!this.#request.body, 'body already defined');
        const {content, contentType} = util.parseBodyContent(body);
        assert(!is.null(content), 'invalid content');
        this.#request = new model.Request(this.#request, {
            headers: {
                'Content-Type': this.#request.headers.get('Content-Type') || contentType
            },
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
