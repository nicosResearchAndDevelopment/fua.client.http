const fs           = require('fs'), path = require('path'), crypto = require('crypto');
const load         = (filename) => fs.readFileSync(path.join(__dirname, filename));
exports.key        = load('./server.key');
exports.privateKey = crypto.createPrivateKey(exports.key);
exports.pub        = load('./server.pub');
exports.publicKey  = crypto.createPublicKey(exports.pub);
exports.cert       = load('./server.cert');
exports.ca         = load('./server.ca');
Object.freeze(exports);
