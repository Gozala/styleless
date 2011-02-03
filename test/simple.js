// vim:ts=2:sts=2:sw=2:
'use strict'

var Style = require('styleless').Style

exports.Assert = require('./assert').Assert
exports['test variables'] = function (assert) {
  var color = '#4D926F'
  var variables = Style({
    '#header': { 
      color: color
    },
    h2: {
      color: color
    }
  })

  var actual = variables.toString()
  var expected = [
    '#header {',
    '    color: #4D926F;',
    '}',
    'h2 {',
    '    color: #4D926F;',
    '}\n'
  ].join('\n')

  assert.equalText(actual, expected, 'testing varibales')
}

exports['test mixins'] = function (assert) {
  function roundedCorners(radius) {
    return {
      'border-radius': radius,
      '-webkit-border-radius': radius,
      '-moz-border-radius': radius
    }
  }

  var mixins = Style({
    '#header': Style(roundedCorners('15px'), {
      color: 'red'
    }),
    '#footer': Style(roundedCorners('10px'), {
      background: 'blue'
    })
  })

  var actual = mixins.toString()
  var expected = [ '#header {',
    '    border-radius: 15px;',
    '    -webkit-border-radius: 15px;',
    '    -moz-border-radius: 15px;',
    '    color: red;',
    '}',
    '#footer {',
    '    border-radius: 10px;',
    '    -webkit-border-radius: 10px;',
    '    -moz-border-radius: 10px;',
    '    background: blue;',
    '}\n'
  ].join('\n')

  assert.equalText(actual, expected, 'testing mixins')
}

exports['test nested'] = function (assert) {
  var nestedRules = Style({
    '#header': {
      h1: {
        'font-size': '26px',
        'font-weight': 'bold'
      },
      p: {
        'font-size': '12px',

        a: {
          'text-decoration': 'none',

          ':hover': {
            'border-width': '1px'
          }
        }
      }
    }
  })

  var actual = nestedRules.toString()
  var expected = [
    '#header h1 {',
    '    font-size: 26px;',
    '    font-weight: bold;',
    '}',
    '#header p {',
    '    font-size: 12px;',
    '}',
    '#header p a {',
    '    text-decoration: none;',
    '}',
    '#header p a:hover {',
    '    border-width: 1px;',
    '}\n'
  ].join('\n')

  assert.equalText(actual, expected, 'nested rules')
}

/*
 Style({
  '@media screen': Style({
    head: { color: 'red' }
  })
})

@media screen {
  head {
    color: 'red';
  }
}
*/

if (require.main == module) require('test').run(exports)
