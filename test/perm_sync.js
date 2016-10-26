var mkdirp = require('../');
var path = require('path');
var fs = require('fs');
var exists = fs.exists || path.exists;
var test = require('tap').test;
var testUtils = require('./utils/');
var _0777 = parseInt('0777', 8);
var _0755 = parseInt('0755', 8);

var tmpDir = testUtils.mktemp('/tmp/node-mkdirp_test_');

test('sync perm', function (t) {
    t.plan(4);
    var file = testUtils.randomDeepFile(tmpDir, 1, 4);
    
    mkdirp.sync(file, _0755);
    exists(file, function (ex) {
        t.ok(ex, 'file created');
        fs.stat(file, function (err, stat) {
            t.ifError(err);
            t.equal(stat.mode & _0777, _0755);
            t.ok(stat.isDirectory(), 'target not a directory');
        });
    });
});

test('sync root perm', function (t) {
    t.plan(3);
    
    var file = '/tmp';
    mkdirp.sync(file, _0755);
    exists(file, function (ex) {
        t.ok(ex, 'file created');
        fs.stat(file, function (err, stat) {
            t.ifError(err);
            t.ok(stat.isDirectory(), 'target not a directory');
        })
    });
});

test('cleanup', function(t) {
  testUtils.cleanup(tmpDir);
  t.end();
});
