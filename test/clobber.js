var mkdirp = require('../').mkdirp;
var path = require('path');
var fs = require('fs');
var test = require('tap').test;
var testUtils = require('./utils/');
var _0755 = parseInt('0755', 8);

var tmpDir = testUtils.mktemp('/tmp/node-mkdirp_test_');
var file = testUtils.randomDeepFile(tmpDir, 25, 4);

// a file in the way
var itw = file.split('/').slice(0, 3).join('/');

test('clobber-pre', function (t) {
    console.error("about to write to "+itw)
    fs.writeFileSync(itw, 'I AM IN THE WAY, THE TRUTH, AND THE LIGHT.');

    fs.stat(itw, function (er, stat) {
        t.ifError(er)
        t.ok(stat && stat.isFile(), 'should be file')
        t.end()
    })
})

test('clobber', function (t) {
    t.plan(2);
    mkdirp(file, _0755, function (err) {
        t.ok(err);
        t.equal(err.code, 'ENOTDIR');
        t.end();
    });
});

test('cleanup', function(t) {
  testUtils.cleanup(tmpDir);
  t.end();
});
