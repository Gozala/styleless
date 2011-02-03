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
    return Selector(name, rules[name])
  }).join('\n')
}
exports.Style = Style

function resolveSelectors(rules, parentSelector, target, root) {
  parentSelector = parentSelector || ''

  Object.keys(rules).forEach(function(name) {
    var selector = parentSelector ? parentSelector + ' ' + name : name
    var rule = rules[name]
    if ('object' !== typeof rule) target[name] = rules[name]
    else if (rule instanceof Style) target[name] = rule.toString()
    else resolveSelectors(rule, selector, root[selector] = {}, root)
  })
  return root
}

function Selector(name, rules) {
  var css = name + ' {\n'
  Object.keys(rules).forEach(function(name) {
    css += '    ' + name + ': ' + rules[name] + ';\n'
  })
  css += '}'
  return css
}
