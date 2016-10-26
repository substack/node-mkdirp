var mkdirp = require('../');
var path = require('path');
var test = require('tap').test;
var testUtils = require('./utils/');
var mockfs = require('mock-fs');
var _0777 = parseInt('0777', 8);
var _0755 = parseInt('0755', 8);

test('opts.fs', function (t) {
    t.plan(5);

    var xfs = mockfs.fs();
    testUtils.setFS(xfs);

    var file = testUtils.randomDeepFile('/beep/boop/', 3, 4);
    
    mkdirp(file, { fs: xfs, mode: _0755 }, function (err) {
        t.ifError(err);
        xfs.exists(file, function (ex) {
            t.ok(ex, 'created file');
            xfs.stat(file, function (err, stat) {
                t.ifError(err);
                t.equal(stat.mode & _0777, _0755);
                t.ok(stat.isDirectory(), 'target not a directory');
            });
        });
    });
});
