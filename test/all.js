'use strict'

exports['test simple'] = require('./simple')
exports['test at-rules'] = require('./atrules')

if (module == require.main) require('test').run(exports)
