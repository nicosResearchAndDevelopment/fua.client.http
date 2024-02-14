const
    expect           = require('expect'),
    {describe, test} = require('mocha'),
    HTTP             = require('../src/http.js');

describe('fua.client.http', function () {

    test('develop', async function () {

        // console.log('HTTP:', HTTP);
        // console.log('HTTP():', HTTP());
        // console.log('new HTTP():', new HTTP());

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

    test('response.dataset', async function () {
        this.timeout('10s');
        const dataset = await HTTP().get('http://www.w3.org/1999/02/22-rdf-syntax-ns#', {'Accept': 'text/turtle'}).valid().dataset();
        console.log(dataset, 'size=' + dataset.size);
    });

});
