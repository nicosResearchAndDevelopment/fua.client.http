const
    assert  = require('@nrd/fua.core.assert'),
    express = require('express');

// console.log(express);
// console.log(express.static.mime.lookup('.html'));

const dummy = {
    req: {
        secret: undefined
    },
    // app: express(),
    // set:    express.response.append,
    append(field, value) {
        console.log(`append(field = "${field}", value = "${value}")`);
        assert.todo();
    },
    // setHeader: express.response.setHeader,
    // set:       express.response.set,
    set(field, value) {
        console.log(`set(field = "${field}", value = "${value}")`);
        assert.todo();
    },
    cookie: express.response.cookie,
    type:   express.response.type
    // send:   express.response.send,
    // get:    express.response.get
};

dummy.type('text');
dummy.cookie('name', 'tobi', {domain: '.example.com', path: '/admin', secure: true});
dummy.cookie('rememberme', '1', {expires: new Date(Date.now() + 900000), httpOnly: true});

// dummy.send();
