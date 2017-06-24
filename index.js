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
  function: 'function'
}

var OBJECTS = {
  Arguments: 'arguments',
  Error: 'error'
}

var toStr = Object.prototype.toString

// public
module.exports = function whatis(test) {
  var quickest = QUICKEST[test]
  
  if (quickest) return quickest
  
  var typeOf = typeof test
  var quick = QUICK[typeOf]
  
  if (quick) return quick
  
  var objType = toStr.call(test).slice(8, -1)
  var secondLast = OBJECTS[objType]
  
  if (secondLast) return secondLast

  return test.constructor ? test.constructor.name.toLowerCase() : undefined
}