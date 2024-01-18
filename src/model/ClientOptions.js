const
    assert  = require('@nrd/fua.core.assert'),
    is      = require('@nrd/fua.core.is'),
    strings = require('@nrd/fua.core.strings'),
    Enum    = (...args) => Object.freeze(args);

class ClientOptions {

    static Mode           = Enum('cors', 'no-cors', 'same-origin', 'navigate', 'websocket');
    static Credentials    = Enum('omit', 'same-origin', 'include');
    static Cache          = Enum('default', 'no-store', 'reload', 'no-cache', 'force-cache', 'only-if-cached');
    static Redirect       = Enum('follow', 'error', 'manual');
    static ReferrerPolicy = Enum('no-referrer', 'no-referrer-when-downgrade', 'same-origin', 'origin', 'strict-origin', 'origin-when-cross-origin', 'strict-origin-when-cross-origin', 'unsafe-url');

    constructor(options) {
        // TODO maybe generate optionally from host and port
        this.baseUrl = options?.baseUrl ?? 'http://localhost/';
        assert(is.string(this.baseUrl) && strings.web.url.test(this.baseUrl), 'invalid baseUrl');

        this.mode = options?.mode ?? 'cors';
        assert(ClientOptions.Mode.includes(this.mode), 'invalid mode');

        this.credentials = options?.credentials ?? 'omit';
        assert(ClientOptions.Credentials.includes(this.credentials), 'invalid credentials');

        this.cache = options?.cache ?? 'no-store';
        assert(ClientOptions.Cache.includes(this.cache), 'invalid cache');

        this.redirect = options?.redirect ?? 'follow';
        assert(ClientOptions.Redirect.includes(this.redirect), 'invalid redirect');

        // TODO referrer
        // TODO referrerPolicy

        this.keepAlive = options?.keepAlive ?? options?.keepalive ?? false;
        assert(is.boolean(this.keepAlive), 'invalid keepAlive');

        this.keepalive = options?.keepalive ?? options?.keepAlive ?? false;
        assert(this.keepalive === this.keepAlive, 'invalid keepalive');

        Object.freeze(this);
    }

}

module.exports = ClientOptions;
