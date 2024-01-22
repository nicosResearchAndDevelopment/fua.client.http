const
    assert            = require('@nrd/fua.core.assert'),
    is                = require('@nrd/fua.core.is'),
    errors            = require('@nrd/fua.core.errors'),
    {Readable}        = require('stream'),
    ResponseInterface = {
        url:    is.string.nonempty,
        status: is.number.integer.positive,
        body:   is.validator.instance(ReadableStream)
    };

class AsyncResponse extends Promise {

    static [Symbol.species] = Promise;

    constructor(responsePromise) {
        assert.instance(responsePromise, Promise);
        super(async (resolve, reject) => {
            try {
                const response = await responsePromise;
                assert.object(response, ResponseInterface);
                resolve(response);
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

    // dataset() {
    //     assert.todo(/* TODO */);
    //     // return this.then((response) => {
    //     //     const textStream  = Readable.fromWeb(response.body);
    //     //     const contentType = response.headers.get('Content-Type') || 'text/turtle';
    //     //     const factory     = new TermFactory();
    //     //     const targetURI   = new URL(response.url);
    //     //     const baseIRI     = targetURI.protocol + '//' + targetURI.hostname + targetURI.pathname.replace(/([/#])[^/#]*$/, '$1');
    //     //     const baseIRI     = targetURI.protocol + '//' + targetURI.hostname + targetURI.pathname + (/[/#]$/.test(targetURI.pathname) ? '' : '#');
    //     //     rdf.parseStream(textStream, contentType, factory, baseIRI)
    //     // });
    // }

}

module.exports = AsyncResponse;
