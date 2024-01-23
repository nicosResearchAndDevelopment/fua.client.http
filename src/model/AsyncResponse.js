const
    model      = require('../model.js'),
    assert     = require('@nrd/fua.core.assert'),
    {Readable} = require('stream');

class AsyncResponse extends model.Promise {

    static [Symbol.species] = model.Promise;

    constructor(promise) {
        assert.instance(promise, model.Promise);
        super((resolve, reject) => promise.then(((response) => {
            assert.instance(response, model.Response);
            resolve(response);
        })).catch(reject));
    }

    valid() {
        return new AsyncResponse(this.then((response) => {
            if (response.ok) return response;
            throw new model.ResponseError(response);
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
