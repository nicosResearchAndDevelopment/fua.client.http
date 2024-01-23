const
    model = require('./model.js');

function HTTP(options) {
    return new model.RequestClient(options);
}

module.exports = HTTP;
