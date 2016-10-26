var mkdirp = require('../');
var path = require('path');
var fs = require('fs');
var test = require('tap').test;
var testUtils = require('./utils/');

var tmpDir = testUtils.mktemp('/tmp/node-mkdirp_test_');

test('return value', function (t) {
    t.plan(4);

    // mkdirp returns the first dir created. Ensure /tmp exists.
    try {
      fs.mkdirSync('/tmp');
    }
    catch (err) {
      if (err.code !== 'EEXIST')
      {
        t.fail(err);
        return t.end();
      }
    }

    var file = testUtils.randomDeepFile(tmpDir, 3, 4);

    mkdirp(file, function (err, made) {
        t.ifError(err);
        t.equal(made, file.split('/').slice(0, 3).join('/'));
        mkdirp(file, function (err, made) {
          t.ifError(err);
          t.equal(made, null);
        });
    });
});

test('cleanup', function(t) {
  testUtils.cleanup(tmpDir);
  t.end();
});
