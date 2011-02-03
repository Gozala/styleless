// vim:ts=2:sts=2:sw=2:
'use strict'

var Style = require('styleless').Style

exports.Assert = require('./assert').Assert

exports['test media screen'] = function(assert) {
  var media = Style({
    '@import': 'include.css',
    '@media screen': {
      head: {
        p: {
          color: 'red'          
        }
      }
    }
  })
  var actual = media.toString()
  var expected = [
    '@import include.css',
    '@media screen {',
    'head p {',
    '    color: red;',
    '}',
    '}\n'
  ].join('\n')

  assert.equalText(actual, expected, 'test media')
}

if (require.main == module) require('test').run(exports)
