const RequestClient = require('./model/RequestClient.js');
module.exports      = function HTTP(options) {
    return new RequestClient(options);
};
