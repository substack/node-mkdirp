var mkdirp = require('../');
var path = require('path');
var fs = require('fs');
var test = require('tap').test;
var testUtils = require('./utils/');

var tmpDir = testUtils.mktemp('/tmp/node-mkdirp_test_');

test('return value', function (t) {
    t.plan(2);

    // mkdirp.sync returns the first dir created. Ensure /tmp exists.
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

    // Note that this will throw on failure, which will fail the test.
    var made = mkdirp.sync(file);
    t.equal(made, file.split('/').slice(0, 3).join('/'));

    // making the same file again should have no effect.
    made = mkdirp.sync(file);
    t.equal(made, null);
});

test('cleanup', function(t) {
  testUtils.cleanup(tmpDir);
  t.end();
});
