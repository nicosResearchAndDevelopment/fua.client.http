const
    model          = require('../model.js'),
    assert         = require('@nrd/fua.core.assert'),
    rdf            = require('@nrd/fua.module.rdf'),
    defaultFactory = new model.TermFactory();

/** @mixin ResponseMixin */
const ResponseMixin = {

    /** @returns {ReadableStream} */
    readableStream() {
        const bodyUsable = this.body && !this.bodyUsed && !this.body.locked && !model.Readable.isDisturbed(this.body);
        assert(bodyUsable, 'Body is unusable', TypeError);
        return this.body;
    },

    /** @returns {Readable} */
    readable() {
        return model.Readable.fromWeb(this.readableStream());
    },

    /** @returns {Promise<Buffer>} */
    buffer() {
        return this.arrayBuffer().then(Buffer.from);
    },

    /**
     * @param {TermFactory} [factory]
     * @returns {Promise<Dataset>}
     */
    async dataset(factory = defaultFactory) {
        assert.instance(factory, model.TermFactory);
        const
            textStream  = this.readable(),
            contentType = (this.headers.get('Content-Type') || 'text/turtle').replace(/;.*$/, ''),
            resourceURL = new URL(this.url),
            baseIRI     = resourceURL.protocol + '//' + resourceURL.hostname + resourceURL.pathname.replace(/([/#])[^/#]*$/, '$1'),
            // baseIRI     = resourceURL.protocol + '//' + resourceURL.hostname + resourceURL.pathname + (/[/#]$/.test(resourceURL.pathname) ? '' : '#'),
            quadStream  = rdf.parseStream(textStream, contentType, factory, baseIRI),
            dataset     = new model.Dataset(null, factory);
        // NOTE for some inputs, the rdf parser can take a very long time and might get stuck
        await dataset.addStream(quadStream);
        return dataset;
    }

};

module.exports = ResponseMixin;
