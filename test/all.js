/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true devel: true
         forin: true latedef: false globalstrict: true */
/*global define: true */

'use strict';

exports['test simple'] = require('./simple')
exports['test at-rules'] = require('./atrules')

if (module == require.main) require('test').run(exports)
