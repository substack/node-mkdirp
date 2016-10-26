var mkdirp = require('../').mkdirp;
var path = require('path');
var fs = require('fs');
var test = require('tap').test;
var testUtils = require('./utils/');
var _0777 = parseInt('0777', 8);
var _0755 = parseInt('0755', 8);
var _0744 = parseInt('0744', 8);

var tmpDir = testUtils.mktemp('/tmp/node-mkdirp_test_');
var file = testUtils.randomDeepFile(tmpDir, 25, 4);

test('chmod-pre', function (t) {
    var mode = _0744
    mkdirp(file, mode, function (er) {
        t.ifError(er, 'should not error');
        fs.stat(file, function (er, stat) {
            t.ifError(er, 'should exist');
            t.ok(stat && stat.isDirectory(), 'should be directory');
            t.equal(stat && stat.mode & _0777, mode, 'should be 0744');
            t.end();
        });
    });
});

test('chmod', function (t) {
    var mode = _0755
    mkdirp(file, mode, function (er) {
        t.ifError(er, 'should not error');
        fs.stat(file, function (er, stat) {
            t.ifError(er, 'should exist');
            t.ok(stat && stat.isDirectory(), 'should be directory');
            t.end();
        });
    });
});

test('cleanup', function(t) {
  testUtils.cleanup(tmpDir);
  t.end();
});
