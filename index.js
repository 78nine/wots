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
module.exports = function whatis(test) {
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