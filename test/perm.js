var mkdirp = require('../');
var path = require('path');
var fs = require('fs');
var exists = fs.exists || path.exists;
var test = require('tap').test;
var testUtils = require('./utils/');
var _0777 = parseInt('0777', 8);
var _0755 = parseInt('0755', 8);

var tmpDir = testUtils.mktemp('/tmp/node-mkdirp_test_');

test('async perm', function (t) {
    t.plan(5);
    var file = testUtils.randomDeepFile(tmpDir, 1, 4);
    
    mkdirp(file, _0755, function (err) {
        t.ifError(err);
        exists(file, function (ex) {
            t.ok(ex, 'file created');
            fs.stat(file, function (err, stat) {
                t.ifError(err);
                t.equal(stat.mode & _0777, _0755);
                t.ok(stat.isDirectory(), 'target not a directory');
            })
        })
    });
});

test('async root perm', function (t) {
    var file = '/tmp';
    mkdirp(file, _0755, function (err) {
        if (err) t.fail(err);
        t.end();
    });
});

test('cleanup', function(t) {
  testUtils.cleanup(tmpDir);
  t.end();
});
