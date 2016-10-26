var mkdirp = require('../');
var path = require('path');
var fs = require('fs');
var exists = fs.exists || path.exists;
var test = require('tap').test;
var testUtils = require('./utils/');
var _0777 = parseInt('0777', 8);
var _0755 = parseInt('0755', 8);

var tmpDir = testUtils.mktemp('/tmp/node-mkdirp_test_');

test('mkdirp with relative path', function (t) {
    t.plan(5);
    
    var cwd = process.cwd();

    fs.mkdirSync(tmpDir);
    process.chdir(tmpDir);
    
    var file = testUtils.randomDeepFile('', 3, 4);
    
    mkdirp(file, _0755, function (err) {
        t.ifError(err);
        exists(file, function (ex) {
            t.ok(ex, 'file created');
            fs.stat(file, function (err, stat) {
                t.ifError(err);
                process.chdir(cwd);
                t.equal(stat.mode & _0777, _0755);
                t.ok(stat.isDirectory(), 'target not a directory');
            })
        })
    });
});

test('cleanup', function(t) {
  testUtils.cleanup(tmpDir);
  t.end();
});
