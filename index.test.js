// source under test
var wots = require('./index')

// dependencies
var assert = require('assert')

// definitions
var noop = function () {}

// tests
suite('wots()', function () {
  test('is a function', function () {
    assert(typeof wots === 'function')
  })

  test('considers itself as a function', function () {
    assert(wots(wots) === 'function')
  })

  suite('JS primitives', function () {

    // boolean
    test('Boolean', function () {
      assert(wots(true) === 'boolean')
      assert(wots(false) === 'boolean')
      assert(wots(new Boolean(1 / 2)) === 'boolean') // eslint-disable-line no-new-wrappers
      assert(wots(new Boolean(100 - 100)) === 'boolean') // eslint-disable-line no-new-wrappers
      assert(wots(!!{ foo: 'bar' }) === 'boolean')
      assert(wots(!0) === 'boolean')
      assert(wots(!null) === 'boolean')
      assert(wots(!undefined) === 'boolean')
    })

    // null
    test('null', function () {
      assert(wots(null) === 'null')
    })

    // undefined
    test('undefined', function () {
      assert(wots(undefined) === 'undefined')
      assert(wots() === 'undefined')
    })

    // Number
    test('Number', function () {
      assert(wots(42) === 'number')
      assert(wots(-1) === 'number')
      assert(wots(0) === 'number')
      assert(wots(Math.PI) === 'number')

      // assert(whatis(015) === 'number')
      // assert(whatis(0001) === 'number')
      // assert(whatis(-0o77) === 'number')

      assert(wots(0x1123) === 'number')
      assert(wots(0x00111) === 'number')
      assert(wots(-0xF1A7) === 'number')

      // assert(whatis(0b11) === 'number')
      // assert(whatis(0b0011) === 'number')
      // assert(whatis(-0b01) === 'number')

      assert(wots(-3.1E+12) === 'number')
      assert(wots(0.1e-23) === 'number')

      assert(wots(new Number(1024)) === 'number') // eslint-disable-line no-new-wrappers

      assert(wots(parseFloat('1.234')) === 'number')
    })

    // String
    test('String', function () {
      assert(wots('') === 'string')
      assert(wots('string') === 'string')
      assert(wots(['even', 'more', 'in', 'the', 'string'].join(' ')) === 'string')
      assert(wots(new String(['even', 'more', 'in', 'the', 'string'].join(' '))) === 'string') // eslint-disable-line no-new-wrappers
    })
  })

  suite('"special" Number types', function () {
    test('NaN', function () {
      assert(wots(NaN) === 'NaN')
      assert(wots(-NaN) === 'NaN')
      assert(wots(NaN - NaN) === 'NaN')
      assert(wots(NaN + NaN) === 'NaN')
      assert(wots(NaN + null) === 'NaN')
      assert(wots(null - NaN) === 'NaN')
      assert(wots(NaN + 1) === 'NaN')
      assert(wots(null / null) === 'NaN')
      assert(wots({} - {}) === 'NaN')
    })

    test('Infinity', function () {
      assert(wots(Infinity) === 'Infinity')
      assert(wots(-Infinity) === 'Infinity')
      assert(wots(1 / 0) === 'Infinity')
    })
  })

  suite('common types of JS built-in objects', function () {
    test('function arguments', function () {
      assert(wots(arguments) === 'arguments')
    })

    test('Array', function () {
      assert(wots([]) === 'array')
      assert(wots([ 1, null, 'array' ]) === 'array')
      assert(wots(new Array(10)) === 'array')
    })

    test('Date', function () {
      assert(wots(new Date()) === 'date')
      assert(wots(new Date('1981-01-03')) === 'date')
    })

    test('Error', function () {
      assert(wots(new Error('some error')) === 'error')
      assert(wots(new TypeError('you are not my type!')) === 'error')
      assert(wots(new RangeError('WHA?!')) === 'error')

      try {
        wots(unknownVariable) // eslint-disable-line no-undef
      } catch (e) {
        assert(wots(e) === 'error')
      }

      try {
        throw new Error('ARRR!')
      } catch (e) {
        assert(wots(e) === 'error')
      }
    })

    test('Function', function () {
      assert(wots(noop) === 'function')
      assert(wots(describe) === 'function')
      assert(wots(it) === 'function')
      assert(wots(assert) === 'function')
      assert(wots(new Function('return null;')) === 'function') // eslint-disable-line no-new-func
    })

    test('Object', function () {
      assert(wots({}) === 'object')
      assert(wots({ foo: 'bar' }) === 'object')
      assert(wots({ method: noop }) === 'object')
      assert(wots(new Object()) === 'object') // eslint-disable-line no-new-object
      assert(wots(Object.create(Object.prototype)) === 'object')

      var ObjectCreateNull = Object.create(null)

      assert(wots(ObjectCreateNull) === 'object')

      ObjectCreateNull['foo'] = 'bar'

      assert(wots(ObjectCreateNull) === 'object')
    })

    test('Promise', function () {
      assert(wots(new Promise(noop)) === 'promise')
      assert(wots(Promise.resolve('data')) === 'promise')
      assert(wots(Promise.reject('error!').catch(noop)) === 'promise') // eslint-disable-line prefer-promise-reject-errors
    })

    test('RegExp', function () {
      assert(wots(/^needle$/mi) === 'regexp')
      assert(wots(new RegExp('needle')) === 'regexp')
    })
  })

  suite('class-like functions', function () {
    test('new MyClass()', function () {
      function MyClass (name) { this.name = name };
      assert(wots(new MyClass()) === 'myclass')
    })

    test('new noop()', function () {
      assert(wots(new noop()) === 'noop') // eslint-disable-line new-cap
    })
  })
})

suite('wots', function () {
  Object.keys(wots).forEach(function (key) {
    test('.' + key + '()', function () {
      assert(wots(wots[key]) === 'function')
      assert(wots[key]() === (/undefined/i).test(key))
      assert(wots(wots[key]()) === 'boolean')
    })
  })
})
