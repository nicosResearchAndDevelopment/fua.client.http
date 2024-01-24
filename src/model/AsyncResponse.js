const
    model      = require('../model.js'),
    assert     = require('@nrd/fua.core.assert'),
    {Readable} = require('stream');

/**
 * @template {{}} Ext
 * @extends {Promise<Response & Ext>}
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

    /** @returns {Promise<ReadableStream>} */
    readableStream() {
        return this.then(response => response.readableStream());
    }

    /** @returns {Promise<Readable>} */
    readable() {
        return this.then(response => response.readable());
    }

    /** @returns {Promise<Blob>} */
    blob() {
        return this.then(response => response.blob());
    }

    /** @returns {Promise<ArrayBuffer>} */
    arrayBuffer() {
        return this.then(response => response.arrayBuffer());
    }

    /** @returns {Promise<Buffer>} */
    buffer() {
        return this.then(response => response.buffer());
    }

    /** @returns {Promise<FormData>} */
    formData() {
        return this.then(response => response.formData());
    }

    /** @returns {Promise<any>} */
    json() {
        return this.then(response => response.json());
    }

    /** @returns {Promise<text>} */
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
