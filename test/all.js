'use strict'

exports['test simple'] = require('./simple')

if (module == require.main) require('test').run(exports)
