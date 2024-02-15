const fs           = require('fs'), path = require('path'), crypto = require('crypto');
const load         = (filename) => fs.readFileSync(path.join(__dirname, filename));
exports.key        = load('./client.key');
exports.privateKey = crypto.createPrivateKey(exports.key);
exports.pub        = load('./client.pub');
exports.publicKey  = crypto.createPublicKey(exports.pub);
exports.cert       = load('./client.cert');
exports.ca         = load('./client.ca');
Object.freeze(exports);
