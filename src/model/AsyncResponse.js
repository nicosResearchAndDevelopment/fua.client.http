const
    assert     = require('@nrd/fua.core.assert'),
    is         = require('@nrd/fua.core.is'),
    errors     = require('@nrd/fua.core.errors'),
    {Readable} = require('stream');

class AsyncResponse extends Promise {

    static [Symbol.species] = Promise;

    constructor(responsePromise) {
        assert.instance(responsePromise, Promise);
        super(async (resolve, reject) => {
            try {
                const response = await responsePromise;
                resolve(response);
                // assert.object(response, {status: is.number.integer});
                // if (response.ok) resolve(response);
                // else reject(new errors.http.ResponseError(response));
            } catch (err) {
                reject(err);
            }
        });
    }

    valid() {
        return new AsyncResponse(this.then((response) => {
            if (!response.ok) throw new errors.http.ResponseError(response);
            return response;
        }));
    }

    readableStream() {
        return this.then(response => response.body);
    }

    readable() {
        return this.readableStream().then(Readable.fromWeb);
    }

    blob() {
        return this.then(response => response.blob());
    }

    arrayBuffer() {
        return this.then(response => response.arrayBuffer());
    }

    buffer() {
        return this.arrayBuffer().then(Buffer.from);
    }

    formData() {
        return this.then(response => response.formData());
    }

    json() {
        return this.then(response => response.json());
    }

    text() {
        return this.then(response => response.text());
    }

}

module.exports = AsyncResponse;
