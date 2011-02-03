'use strict'

function Style() {
  var style = Object.create(Style.prototype)
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
    var selector
    if ('object' === typeof rules[name]) {
      selector = parentSelector + ' ' + name
      resolveSelectors(rules[name], selector, root[selector] = {}, root)
    } else {
      target[name] = rules[name]
    }
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
