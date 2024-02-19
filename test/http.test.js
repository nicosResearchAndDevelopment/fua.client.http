const
    expect                          = require('expect'),
    {describe, test, before, after} = require('mocha'),
    HTTP                            = require('../src/http.js'),
    {Dataset}                       = require('@nrd/fua.module.persistence'),
    errors                          = require('@nrd/fua.core.errors'),
    path                            = require('path'),
    http                            = require('http'),
    https                           = require('https'),
    express                         = require('express'),
    serverConf                      = require('./cert/server.js'),
    clientConf                      = require('./cert/client.js');

describe('fua.client.http', function () {

    const local = Object.create(null);

    local.httpPort  = 3080;
    local.httpsPort = 3443;

    local.httpBaseUrl  = `http://localhost:${local.httpPort}/`;
    local.httpsBaseUrl = `https://localhost:${local.httpsPort}/`;

    before('init server', async function () {
        local.expressApp = express();

        local.expressApp.use('/data', express.static(path.join(__dirname, 'data')));

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

        local.expressApp.post('/ping', express.raw({type: '*/*'}), (request, response) => {
            const contentType = request.get('Content-Type');
            if (contentType) response.type(contentType);
            response.send(request.body);
        });

        local.expressApp.post('/ping/type', (request, response) => {
            const contentType = request.get('Content-Type');
            response.send(contentType || '');
        });

        local.expressApp.all('/status/:code', (request, response) => {
            const statusCode = (request.params.code in errors.http.statusCodes) ? Number(request.params.code) : 404;
            response.status(statusCode).send(errors.http.statusCodes[statusCode]);
        });

        local.httpServer  = http.createServer(local.expressApp);
        local.httpsServer = https.createServer(serverConf, local.expressApp);

        await Promise.all([
            new Promise(resolve => local.httpServer.listen(local.httpPort, resolve)),
            new Promise(resolve => local.httpsServer.listen(local.httpsPort, resolve))
        ]);
    });

    after('close server', async function () {
        local.httpServer.close();
        local.httpsServer.close();
    });

    describe('GET', function () {

        before('init client', async function () {
            local.httpClient  = HTTP({baseUrl: local.httpBaseUrl});
            local.httpsClient = HTTP({baseUrl: local.httpsBaseUrl, ...clientConf});
        });

        test('develop', async function () {
            // console.log(await local.httpClient.get('/hello').accept('json').valid().json());
            // console.log(await local.httpClient.get('/hello').accept('text').valid().text());

            // console.log(await local.httpClient.get('/status/499').valid().text());
        });

        test('Dataset: /data/example.ttl', async function () {
            const dataset = await local.httpClient.get('/data/example.ttl').dataset();
            expect(dataset).toBeInstanceOf(Dataset);
            expect(dataset.size).toBeGreaterThan(0);
        });

        test('accept: /hello', async function () {
            const json = await local.httpClient.get('/hello').accept('text', .2).accept('json', .8).json();
            expect(json).toEqual({'Hello': 'World!'});
            const text = await local.httpClient.get('/hello').accept('text', .8).accept('json', .2).text();
            expect(text).toBe('Hello World!');
        });

        test('valid: /status', async function () {
            await expect(local.httpClient.get('/status/100').valid()).rejects.toThrow();
            await expect(local.httpClient.get('/status/200').valid()).resolves.not.toThrow();
            await expect(local.httpClient.get('/status/300').valid()).rejects.toThrow();
            await expect(local.httpClient.get('/status/400').valid()).rejects.toThrow();
            await expect(local.httpClient.get('/status/500').valid()).rejects.toThrow();
        });

    });

    describe('POST', function () {

        before('init client', async function () {
            local.httpClient  = HTTP({baseUrl: local.httpBaseUrl});
            local.httpsClient = HTTP({baseUrl: local.httpsBaseUrl, ...clientConf});
        });

        test('develop', async function () {
            // console.log(await local.httpClient.post('/ping').send({'lorem': 'ipsum'}).valid().json());
        });

        test('text: /ping', async function () {
            expect(await local.httpClient.post('/ping').send('Hello World!').text()).toBe('Hello World!');
        });

        test('json: /ping', async function () {
            expect(await local.httpClient.post('/ping').send({'lorem': 'ipsum'}).json()).toEqual({'lorem': 'ipsum'});
            expect(await local.httpClient.post('/ping').send('{"lorem": "ipsum"}').json()).toEqual({'lorem': 'ipsum'});
        });

        test('type: /ping/type', async function () {
            expect(await local.httpClient.post('/ping/type').send({'lorem': 'ipsum'}).text()).toEqual('application/json');
            expect(await local.httpClient.post('/ping/type').send('{"lorem": "ipsum"}').text()).toEqual('text/plain');
            expect(await local.httpClient.post('/ping/type').type('json').send('{"lorem": "ipsum"}').text()).toEqual('application/json');
        });

    });

});
