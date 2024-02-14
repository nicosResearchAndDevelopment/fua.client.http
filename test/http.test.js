const
    expect                          = require('expect'),
    {describe, test, before, after} = require('mocha'),
    HTTP                            = require('../src/http.js'),
    {Dataset}                       = require('@nrd/fua.module.persistence'),
    http                            = require('http'),
    https                           = require('https'),
    express                         = require('express');

describe('fua.client.http', function () {

    const local = Object.create(null);

    before('init test server', async function () {

        local.httpPort  = 3000;
        local.httpsPort = 3001;

        local.expressApp  = express();
        local.httpServer  = http.createServer(local.expressApp);
        local.httpsServer = https.createServer({}, local.expressApp);

        local.expressApp.get('/hello', (request, response) => {
            response.format({
                'text': () => {
                    response.send('Hello World!');
                },
                'json': () => {
                    response.send({'Hello': 'World!'});
                }
            })
        });

        local.expressApp.post('/ping', express.raw(), (request, response) => {
            const contentType = request.get('Content-Type');
            if (contentType) response.type(contentType);
            console.log('PING', {contentType, content: request.body});
            response.send(request.body);
        });

        await Promise.all([
            new Promise(resolve => local.httpServer.listen(local.httpPort, resolve)),
            new Promise(resolve => local.httpsServer.listen(local.httpsPort, resolve))
        ]);

        local.httpBaseUrl  = `http://localhost:${local.httpPort}/`;
        local.httpsBaseUrl = `https://localhost:${local.httpsPort}/`;

    });

    after('close test server', async function () {
        local.httpServer.close();
        local.httpsServer.close();
    });

    test('develop', async function () {
        // console.log('HTTP:', HTTP);
        // console.log('HTTP():', HTTP());
        // console.log('new HTTP():', new HTTP());
    });

    describe('GET', function () {

        test('develop', async function () {
            const client = HTTP({baseUrl: local.httpBaseUrl});
            console.log(await client.get('/hello').accept('json').valid().json());
            console.log(await client.get('/hello').accept('text').valid().text());
        });

    });

    describe('POST', function () {

        test('develop', async function () {
            const client = HTTP({baseUrl: local.httpBaseUrl});
            console.log(await client.post('ping').send({'lorem': 'ipsum'}).valid().text()); // FIXME
        });

    });

    describe('AsyncRequest/AsyncResponse', function () {

        test('develop', async function () {
            const client = HTTP({
                credentials: 'include',
                baseUrl:     'https://daps.tb.nicos-rd.com/'
            });

            const result = await client.get('/jwks.json').valid().json();
            console.log(result);

            // const client   = HTTP({connect: {rejectUnauthorized: false}});
            // // console.log(await client.get('https://daps.tb.nicos-rd.com/').valid().buffer());
            // const response = await client.get('https://daps.tb.nicos-rd.com/').valid();
            // console.log(await response.text());
            // console.log(await response.readable());
            // // console.log(await response.buffer());
        });

        test('dataset()', async function () {
            const dataset = await HTTP().get('http://www.w3.org/1999/02/22-rdf-syntax-ns#', {'Accept': 'text/turtle'}).valid().dataset();
            expect(dataset).toBeInstanceOf(Dataset);
            expect(dataset.size).toBeGreaterThan(0);
        });

        test('accept()', async function () {
            const result = await HTTP().fetch('http://www.w3.org/1999/02/22-rdf-syntax-ns#').accept('jsonld', .2).accept('ttl', .8).valid().text();
            // const result = await HTTP().request('https://daps.tb.nicos-rd.com/jwks.json').accept('json').valid().json();
            console.log(result);
        });

    });

});
