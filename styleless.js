/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true devel: true
         forin: true latedef: false globalstrict: true */
/*global define: true */

'use strict';

function Style() {
  var style = this instanceof Style ? this : new Style()
  Array.prototype.forEach.call(arguments, function (rules) {
    rules = JSON.parse(JSON.stringify(rules))
    Object.keys(rules).forEach(function (name) {
      style[name] = rules[name]
    })
  })
  return style
}
Style.prototype.toString = function toString() {
  var rules = resolveSelectors(this)
  return Object.keys(rules).map(function(name) {
    var value = isAtRule(name)
      ? AtRule(name, rules[name])
      : Selector(name, rules[name])
    return  value ? value + '\n' : ''
  }).join('')
}
exports.Style = Style

function isAtRule(name) {
  return name && name[0] === '@'
}

function isPseudoSelector(name) {
  return name && name[0] === ':'
}

function resolveSelectors(rules, result, parentSelector) {
  result = result || {}
  parentSelector = parentSelector || ''

  Object.keys(rules).forEach(function(name) {
    var selector
    if (isPseudoSelector(name)) selector = parentSelector + name
    else if (parentSelector) selector = parentSelector + ' ' + name
    else selector = name

    if (isAtRule(name)) {
      var rule = rules[name]
      result[name] = typeof rule === 'string' ? rule : Style(rule).toString()
    } else if (typeof rules[name] === 'object')
      resolveSelectors(rules[name], result, selector)
    else (result[parentSelector] || (result[parentSelector] = {}))[name] = rules[name]
  })
  return result
}

function Selector(name, rules) {
  var value = '', names = Object.keys(rules)
  if (names.length) {
    value += name + ' {\n'
    value += names.map(function(name) {
      return '    ' + name + ': ' + rules[name] + ';\n'
    }).join('')
    value += '}'
  }
  return value
}

function AtRule(name, rules) {
  if (name.indexOf('@import') !== -1)
    return name + ' ' + rules
  return name + ' {\n' + rules + '}'
}
