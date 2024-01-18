const
    expect           = require('expect'),
    {describe, test} = require('mocha'),
    HTTP             = require('../src/http.js');

describe('fua.client.http', function () {

    test('develop', function () {

        console.log('HTTP:', HTTP);
        console.log('HTTP():', HTTP());
        console.log('new HTTP():', new HTTP());

    });

});
