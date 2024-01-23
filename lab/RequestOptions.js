const
    assert  = require('@nrd/fua.core.assert'),
    is      = require('@nrd/fua.core.is'),
    strings = require('@nrd/fua.core.strings'),
    Enum    = (...args) => Object.freeze(args);

class RequestOptions {

    static Method   = Enum('GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE');
    static Priority = Enum('high', 'low', 'auto');

    constructor(options) {
        this.url = options?.url ?? '/';
        assert(is.string(this.url), 'invalid url');

        this.method = options?.method ?? 'GET';
        assert(RequestOptions.Method.includes(this.method), 'invalid method');

        // TODO headers
        // TODO body

        this.integrity = options?.integrity ?? '';
        assert(this.integrity === '' || is.string.token(this.integrity), 'invalid integrity');

        // TODO signal: should be null, could also be a timeout-signal, otherwise an AbortController is needed (or both)
        // SEE https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal#examples
        // this.signal = options?.signal ?? new AbortSignal();
        // assert(this.signal instanceof AbortSignal, 'invalid signal');

        this.priority = options?.priority ?? 'auto';
        assert(RequestOptions.Priority.includes(this.priority), 'invalid priority');

        Object.freeze(this);
    }

}

module.exports = RequestOptions;
