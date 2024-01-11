const
    util = exports;

util.contentResolvers = Object.freeze({
    '*/*':                               async (response) => Buffer.from(await response.arrayBuffer()),
    'text/*':                            (response) => response.text(),
    'text/plain':                        (response) => response.text(),
    'application/json':                  (response) => response.json(),
    'application/x-www-form-urlencoded': (response) => response.formData(),
    'multipart/form-data':               (response) => response.formData()
});
