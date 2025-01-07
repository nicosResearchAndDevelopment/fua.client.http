const
    async       = require('@fua/core.async'),
    express     = require('express'),
    https       = require('https'),
    undici      = require('undici'),
    serverCerts = require('./certs/server.js');

async.iife.process(async function main() {

    const
        app    = express(),
        server = https.createServer(serverCerts, app);

    app.get('/', function (request, response) {
        response.type('json').send(JSON.stringify({'lorem': 'ipsum'}));
    });

    await new Promise(resolve => server.listen(3000, resolve));

    // SEE https://github.com/nodejs/undici/issues/1489#issuecomment-1543856261
    const response = await undici.fetch('https://localhost:3000/', {
        method:     'GET',
        dispatcher: new undici.Agent({
            connect: {
                rejectUnauthorized: false
            }
        })
        // dispatcher: new undici.ProxyAgent({
        //     uri:        'https://localhost:3000/',
        //     requestTls: {
        //         rejectUnauthorized: false
        //     }
        // })
    });

    console.log(`[${response.status}] ${response.statusText}\n${await response.text()}`);

});
