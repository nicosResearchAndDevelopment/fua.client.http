const
    assert = require('@nrd/fua.core.assert'),
    model  = require('../model.js');

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
    }

};

module.exports = ResponseMixin;
