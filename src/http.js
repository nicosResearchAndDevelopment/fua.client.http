const
    model         = require('./model.js'),
    defaultClient = new model.RequestClient();

function HTTP(options) {
    return new model.RequestClient(options);
}

HTTP.fetch  = (url, options) => defaultClient.fetch(url, options);
HTTP.get    = (url, headers) => defaultClient.get(url, headers);
HTTP.head   = (url, headers) => defaultClient.head(url, headers);
HTTP.post   = (url, headers, body) => defaultClient.post(url, headers, body);
HTTP.put    = (url, headers, body) => defaultClient.put(url, headers, body);
HTTP.delete = (url, headers, body) => defaultClient.delete(url, headers, body);
// HTTP.options = defaultClient.options.bind(defaultClient);
// HTTP.connect = defaultClient.connect.bind(defaultClient);
// HTTP.trace   = defaultClient.trace.bind(defaultClient);

module.exports = HTTP;
