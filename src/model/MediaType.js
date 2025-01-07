const
    assert = require('@fua/core.assert'),
    is     = require('@fua/core.is'),
    mime   = require('mime');

function MediaType(type, parameters) {
    assert.string(type);
    let result = (mime.getType(type) || type).trim().toLowerCase();
    assert(/^[^/]+\/\S+$/.test(result), 'invalid type');
    if (!parameters) return result;
    assert.object(parameters);
    for (let [key, value] of Object.entries(parameters)) {
        if (is.null(value)) continue;
        assert(is.string.token(key) && is.string(value), 'invalid parameter');
        result += '; ' + key + '=' + ((value.includes('"') || value.length === 0) ? '"' + value.replace(/"/g, '""') + '"' : value);
    }
    return result;
}

module.exports = MediaType;
