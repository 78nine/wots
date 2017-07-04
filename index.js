// definitions
var QUICKEST = {
  false: 'boolean',
  Infinity: 'Infinity',
  '-Infinity': 'Infinity',
  null: 'null',
  NaN: 'NaN',
  true: 'boolean',
  undefined: 'undefined'
}

var QUICK = {
  function: 'function',
  number: 'number',
  string: 'string'
}

var OBJECTS = {
  '[object Arguments]': 'arguments',
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object Error]': 'error',
  '[object Promise]': 'promise',
  '[object RegExp]': 'regexp'
}

var toStr = Object.prototype.toString

// public
module.exports = function wots (test) {
  if (typeof test === 'object' && test !== null) {
    // fixes [#1](https://github.com/tvardy/wots/issues/1) before checking other possibilities
    if (!test.toString && !test.constructor) return 'object'
  }

  var quickest = QUICKEST[test]

  if (quickest) return quickest

  var typeOf = typeof test
  var quick = QUICK[typeOf]

  if (quick) return quick

  var objType = toStr.call(test)
  var secondLast = OBJECTS[objType]

  if (secondLast) return secondLast

  return test.constructor ? test.constructor.name.toLowerCase() : undefined
}
