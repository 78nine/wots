# why?
The library was written as a simple coding exercise, but then appeared useful to share :wink:

# how?
```
npm install --save what-is
```

and then

```js
var whatis = require('what-is');

// ...

if (whatis(myNotAlwaysNumericVariable) === 'NaN') {
    // do some stuff
}
```

# what?
`whatis()` function returns reasonable type names for tested values:

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
|                     | `Object.create(null)`               | **throws error** *(to be fixed)* |
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