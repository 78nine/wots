// definitions
const QUICKEST = {
  false: 'boolean',
  Infinity: 'Infinity',
  '-Infinity': 'Infinity',
  null: 'null',
  NaN: 'NaN',
  true: 'boolean',
  undefined: 'undefined'
};

const QUICK = {
  function: 'function',
  number: 'number',
  string: 'string'
};

const OBJECTS = {
  '[object Arguments]': 'arguments',
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object Error]': 'error',
  '[object Promise]': 'promise',
  '[object RegExp]': 'regexp'
};

// helpers
const toStr = Object.prototype.toString;

// main part
const wots = (test) => {
  // fixes [#1](https://github.com/tvardy/wots/issues/1) before checking other possibilities
  if (typeof test === 'object' && test !== null) {
    if (!test.toString && !test.constructor) return 'object';
  }

  // fixes [#2](https://github.com/tvardy/wots/issues/2) before checking QUICKEST
  if (Object.keys(QUICKEST).some(el => el === test)) return 'string';

  // QUICKEST
  const quickest = QUICKEST[test];

  if (quickest) return quickest;

  // QUICK
  const typeOf = typeof test;
  const quick = QUICK[typeOf];

  if (quick) return quick;

  // OBJECTS
  const objType = toStr.call(test);
  const secondLast = OBJECTS[objType];

  if (secondLast) return secondLast;

  // ALL OTHERS
  return test.constructor ? test.constructor.name.toLowerCase() : undefined;
};

// static methods
[
  'null',
  'undefined',
  'string',
  'number',
  'NaN',
  'infinity',
  'boolean',
  'RegExp',
  'array',
  'object',
  'function',
  'date',
  'error',
  'arguments',
  'promise'
].forEach(key => {
  const first = key.slice(0, 1).toUpperCase();
  const rest = key.slice(1);
  const name = `is${first}${rest}`;

  wots[name] = (test) => wots(test) === key;
});

// public
export default wots;
