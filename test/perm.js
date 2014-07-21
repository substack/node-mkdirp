var mkdirp = require('../');
var path = require('path');
var fs = require('fs');
var exists = fs.exists || path.exists;
var test = require('tap').test;

test('async perm', function (t) {
    t.plan(5);
    var file = '/tmp/' + (Math.random() * (1<<30)).toString(16);
    
    mkdirp(file, parseInt(755, 8), function (err) {
        t.ifError(err);
        exists(file, function (ex) {
            t.ok(ex, 'file created');
            fs.stat(file, function (err, stat) {
                t.ifError(err);
                t.equal(stat.mode & parseInt(777, 8), parseInt(755, 8));
                t.ok(stat.isDirectory(), 'target not a directory');
            })
        })
    });
});

test('async root perm', function (t) {
    mkdirp('/tmp', parseInt(755, 8), function (err) {
        if (err) t.fail(err);
        t.end();
    });
    t.end();
});
