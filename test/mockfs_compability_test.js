var mkdirp = require('../');
var path = require('path');
var fs = require('fs');
var MockFs = new require('mockfs');

var test = require('tap').test;

// mockfs allows mounting a virtual file system
// the problem is that errors are returned in
// error.message not in error.code
// compatibility can be added by using error.code || error.message

test('mkdirp will create directories in a virtual filesystem created by mockfs', function (x) {
    'use strict';

    // prepare spec where we use
    var vfspec = {
        time: 'Tue May 07 2013 17:09:57 GMT+0400',
        ctime: new Date(),
        items : {
            'root': {
                items : {
                    'test-dir': {
                        items : {
                        }
                    }
                }
            }
        }
    };

    // mount
    var mfs = new MockFs(vfspec);
    mfs.mount('/mnt/vfs');

    // create directory
    var wantedDirectory='/mnt/vfs/root/first/second/third';
    mkdirp.sync(wantedDirectory);

    // make sure directory exists
    x.equal(fs.existsSync(wantedDirectory),true,"directory must exist");
    x.end();
});
