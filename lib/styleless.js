// vim:ts=2:sts=2:sw=2:
'use strict'

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
  var rules = resolveSelectors(this, null, null, {})
  return Object.keys(rules).map(function(name) {
    var value = Selector(name, rules[name])
    return  value ? value + '\n' : ''
  }).join('')
}
exports.Style = Style

function resolveSelectors(rules, parentSelector, target, root) {
  parentSelector = parentSelector || ''

  Object.keys(rules).forEach(function(name) {
    var selector = parentSelector
    selector = !selector ? name : ':' == name[0] ? selector + name
                          : selector + ' ' + name
    var rule = rules[name]
    if ('object' !== typeof rule) target[name] = rules[name]
    else if (rule instanceof Style) target[name] = rule.toString()
    else resolveSelectors(rule, selector, root[selector] = {}, root)
  })
  return root
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
