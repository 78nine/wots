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

var wots = function (test) {
  // fixes [#1](https://github.com/tvardy/wots/issues/1) before checking other possibilities
  if (typeof test === 'object' && test !== null) {
    if (!test.toString && !test.constructor) return 'object'
  }

  // fixes [#2](https://github.com/tvardy/wots/issues/2) before checking QUICKEST
  if (Object.keys(QUICKEST).some(function (el) { return el === test; })) return 'string'

  // QUICKEST
  var quickest = QUICKEST[test]

  if (quickest) return quickest

  // QUICK
  var typeOf = typeof test
  var quick = QUICK[typeOf]

  if (quick) return quick

  // OBJECTS
  var objType = toStr.call(test)
  var secondLast = OBJECTS[objType]

  if (secondLast) return secondLast

  // ALL OTHERS
  return test.constructor ? test.constructor.name.toLowerCase() : undefined
}

var methods = {
  isNull: 'null',
  isUndefined: 'undefined',
  isString: 'string',
  isNumber: 'number',
  isNaN: 'NaN',
  isInfinity: 'Infinity',
  isBoolean: 'boolean',
  isRegExp: 'regexp',
  isArray: 'array',
  isObject: 'object',
  isFunction: 'function',
  isDate: 'date',
  isError: 'error',
  isArguments: 'arguments',
  isPromise: 'promise'
}

Object.keys(methods).forEach(function (key) {
  wots[key] = function (test) { return wots(test) === methods[key] }
})

// public
exports = module.exports = wots
