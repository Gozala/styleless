'use strict'

exports['test simple'] = require('./simple')
exports['test media'] = require('./media')

if (module == require.main) require('test').run(exports)
