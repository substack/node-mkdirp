var mkdirp = require('../');
var path = require('path');
var fs = require('fs');
var exists = fs.exists || path.exists;
var test = require('tap').test;
var _0777 = parseInt('0777', 8);
var _0755 = parseInt('0755', 8);

test('illegal_path', function (t) {
    // internal fs.mkdir will throw err if path is illegal
    var file = '/tmp/\x00\x00\x00';
    
    mkdirp(file, _0755, function (err) {
        t.true(err.code === 'ENOENT');
    });
});
