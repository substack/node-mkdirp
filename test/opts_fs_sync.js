var mkdirp = require('../');
var path = require('path');
var test = require('tap').test;
var mockfs = require('mock-fs');

test('opts.fs sync', function (t) {
    t.plan(4);
    
    var x = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var y = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    var z = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    
    var file = '/beep/boop/' + [x,y,z].join('/');
    var xfs = mockfs.fs();
    
    mkdirp.sync(file, { fs: xfs, mode: parseInt(755, 8) });
    xfs.exists(file, function (ex) {
        t.ok(ex, 'created file');
        xfs.stat(file, function (err, stat) {
            t.ifError(err);
            t.equal(stat.mode & parseInt(777, 8), parseInt(755, 8));
            t.ok(stat.isDirectory(), 'target not a directory');
        });
    });
});
