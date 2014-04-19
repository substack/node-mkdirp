#!/usr/bin/env node

var mkdirP = require('./')

mkdirP.apply(null, process.argv.slice(2));
