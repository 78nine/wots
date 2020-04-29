# why?

The library was written as a simple coding exercise, but then appeared useful to share :wink:

# how?

```bash
npm install --save wots
```

and then

```javascript
// use as ES6 module
import wots from 'wots';

// use in NodeJs
var wots = require('wots');

// use as global variable via UnPKG
<script src="https://unpkg.com/wots"></script>

// ... then ...

if (wots(myNotAlwaysNumericVariable) === 'NaN') {
  // do some stuff
  // e.g. console.log('I cannot count on it')
} else if (wots(myNotAlwaysNumericVariable) === 'Infinity') {
  // do some other stuff
  // e.g. console.log('Please do not force me to use this value in a loop!')
}
```


# what?

`wots()` function returns reasonable type names for tested values:

| description         | input                               | result        |
| :------------------ | :---------------------------------- |:------------- |
| null                | `null`                              | `'null'`      |
| undefined           | `undefined`                         | `'undefined'` |
| strings             | `'foo'`                             | `'string'`    |
|                     | `''`                                | `'string'`    |
|                     | `['Hello', 'world!'].join(' ')`     | `'string'`    |
|                     | `new String()`                      | `'string'`    |
| numbers             | `5`                                 | `'number'`    |
|                     | `parseInt(42)`                      | `'number'`    |
|                     | `new Number('3')`                   | `'number'`    |
|                     | `NaN`                               | `'NaN'`       |
|                     | `Infinity`                          | `'Infinity'`  |
|                     | `1 / -0`                            | `'Infinity'`  |
| boolean values      | `false`                             | `'boolean'`   |
|                     | `!!nonEmptyVariable`                | `'boolean'`   |
|                     |`new Boolean('0')`                   | `'boolean'`   |
| regular expressions | `/^test$/g`                         | `'regexp'`    |
|                     | `new RegExp('needle', 'i')`         | `'regexp'`    |
| arrays              | `['foo', 'bar', 'baz']`             | `'array'`     |
|                     | `new Array(10)`                     | `'array'`     |
| objects             | `{ foo: 'bar'}`                     | `'object'`    |
|                     | `{}`                                | `'object'`    |
|                     | `new Object()`                      | `'object'`    |
|                     | `Object.create(null)`               | `'object`     |
| functions           | `function () {}`                    | `'function'`  |
|                     | `new Function('return null')`       | `'function'`  |
| date objects        | `new Date()`                        | `'date'`      |
| errors              | `new Error('error!')`               | `'error'`     |
|                     | `new TypeError('type error!')`      | `'error'`     |
| arguments objects   | `(function(){return arguments;})()` | `'arguments'` |
| class constructors  | `new MyClass()`                     | `'myclass'`   |
|                     | `new Buffer()`                      | `'buffer'`    |
|                     | `new XMLHttpRequest()`              | `'xmlhttprequest'` |
| promises            | `new Promise(function() {})`        | `'promise'`   |
|                     | `Promise.resolve('data')`           | `'promise'`   |
|                     | `Promise.reject(new Error('Oop!'))` | `'promise'`   |

**Note:** for more examples see [test file](./index.test.js)

Since version 0.2.0 the library also exposes static methods listed below:

```javascript
wots.isNull()
wots.isUndefined()
wots.isString()
wots.isNumber()
wots.isNaN()
wots.isInfinity()
wots.isBoolean()
wots.isRegExp()
wots.isArray()
wots.isObject()
wots.isFunction()
wots.isDate()
wots.isError()
wots.isArguments()
wots.isPromise()
```

# the name

`wots` basically stands for `what is` but is shorter :wink:
