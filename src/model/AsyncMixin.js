/** @mixin AsyncMixin */
const AsyncMixin = {

    /** @returns {Promise<ReadableStream>} */
    readableStream() {
        return this.then(response => response.readableStream());
    },

    /** @returns {Promise<Readable>} */
    readable() {
        return this.then(response => response.readable());
    },

    /** @returns {Promise<Blob>} */
    blob() {
        return this.then(response => response.blob());
    },

    /** @returns {Promise<ArrayBuffer>} */
    arrayBuffer() {
        return this.then(response => response.arrayBuffer());
    },

    /** @returns {Promise<Buffer>} */
    buffer() {
        return this.then(response => response.buffer());
    },

    /** @returns {Promise<FormData>} */
    formData() {
        return this.then(response => response.formData());
    },

    /** @returns {Promise<any>} */
    json() {
        return this.then(response => response.json());
    },

    /** @returns {Promise<string>} */
    text() {
        return this.then(response => response.text());
    },

    /**
     * @param {TermFactory} [factory]
     * @returns {Promise<Dataset>}
     */
    dataset(factory) {
        return this.then(response => response.dataset(factory));
    }

};

module.exports = AsyncMixin;
