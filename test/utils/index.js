var fs = require('fs');

var xfs = fs;

/* Change the underlying FS implementation we rely on.
 * newFS must support the Node.js fs APIs.
 */
function setFS (newFS) {
  xfs = newFS;
}

/* Returns true if f exists, else false. */
function exists (f) {
  try {
    xfs.statSync(f);
  }
  catch (err) {
    return false;
  }

  return true;
}

/* Returns the name of a file that does not currently exist, beginning with the prefix 'template' and in the same dir.
 * Performs a synchronous search of 16^6 possible file names.
 * See man 3 mktemp.
 */
function mktemp (template) {
  var name;
  while (1) {
    name = template + Math.floor(Math.random() * Math.pow(16, 6)).toString(16);
    try {
      var stat = xfs.statSync(name);
    }
    catch (err) {
      if (err.code === 'ENOENT')
        return name;
    }
  }
}

/* Returns a filename in a child dir underneath root.
 *   root:  where to start (does not need to end in '/')
 *          if '', we make a relative path 'x/y/z/...'
 *          otherwise, path is 'root/x/y/z/...'
 *   depth: how many levels
 *   width: how wide the file name at each level should be
 */
function randomDeepFile (root, depth, width) {
  var ps = [];
  for (var i = 0; i < depth; i++) {
    var dir = Math.floor(Math.random() * Math.pow(16, width)).toString(16);
    ps.push(dir);
  }

  var subTree = ps.join('/');
  var f;
  if (root)
    f = root + '/' + subTree;
  else
    f = subTree;
  return f;
}

/* 'rm -rf f_or_d'.
 * Assumes directories contain only normal files and directories.
 * Use with caution.
 */
function cleanup (f_or_d) {
  if (!exists(f_or_d))
    return;

  var stat = xfs.statSync(f_or_d);
  if (stat.isFile())
  {
    xfs.unlinkSync(f_or_d);
    return;
  }
  else if (stat.isDirectory())
  {
    var entries = xfs.readdirSync(f_or_d);
    for (var i = 0; i < entries.length; i++)
    {
      var entry = entries[i];
      var abs = f_or_d + '/' + entry;
      cleanup(abs);
    }
    xfs.rmdirSync(f_or_d);
  }

  return;
}

module.exports = {
  setFS: setFS,
  exists: exists,
  mktemp: mktemp,
  randomDeepFile: randomDeepFile,
  cleanup: cleanup,
};
