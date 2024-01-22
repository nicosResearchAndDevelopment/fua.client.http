const
    async       = require('@nrd/fua.core.async'),
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

    const response = await fetch('https://localhost:3000/', {
        method:     'GET',
        dispatcher: new undici.Agent({
            connect: {
                rejectUnauthorized: false
            }
        })
    });

    console.log(`[${response.status}] ${response.statusText}\n${await response.text()}`);

});
