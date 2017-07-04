// source under test
var whatis = require('./index')

// dependencies
var assert = require('assert')

// definitions
var noop = function () {}

// tests
describe('whatis:', function () {
  it('should be a function', function () {
    assert(typeof whatis === 'function')
  })

  it('should recognize itself as a function', function () {
    assert(whatis(whatis) === 'function')
  })

  describe('should properly recognize all JS primitives', function () {
    // boolean
    it('Boolean', function () {
      assert(whatis(true) === 'boolean')
      assert(whatis(false) === 'boolean')
      assert(whatis(new Boolean(1 / 2)) === 'boolean') // eslint-disable-line no-new-wrappers
      assert(whatis(new Boolean(100 - 100)) === 'boolean') // eslint-disable-line no-new-wrappers
      assert(whatis(!!{ foo: 'bar' }) === 'boolean')
      assert(whatis(!0) === 'boolean')
      assert(whatis(!null) === 'boolean')
      assert(whatis(!undefined) === 'boolean')
    })

    // null
    it('null', function () {
      assert(whatis(null) === 'null')
    })

    // undefined
    it('undefined', function () {
      assert(whatis(undefined) === 'undefined')
      assert(whatis() === 'undefined')
    })

    // Number
    it('Number', function () {
      assert(whatis(42) === 'number')
      assert(whatis(-1) === 'number')
      assert(whatis(0) === 'number')
      assert(whatis(Math.PI) === 'number')

      // assert(whatis(015) === 'number')
      // assert(whatis(0001) === 'number')
      // assert(whatis(-0o77) === 'number')

      assert(whatis(0x1123) === 'number')
      assert(whatis(0x00111) === 'number')
      assert(whatis(-0xF1A7) === 'number')

      // assert(whatis(0b11) === 'number')
      // assert(whatis(0b0011) === 'number')
      // assert(whatis(-0b01) === 'number')

      assert(whatis(-3.1E+12) === 'number')
      assert(whatis(0.1e-23) === 'number')

      assert(whatis(new Number(1024)) === 'number') // eslint-disable-line no-new-wrappers

      assert(whatis(parseFloat('1.234')) === 'number')
    })

    // String
    it('String', function () {
      assert(whatis('') === 'string')
      assert(whatis('string') === 'string')
      assert(whatis(['even', 'more', 'in', 'the', 'string'].join(' ')) === 'string')
      assert(whatis(new String(['even', 'more', 'in', 'the', 'string'].join(' '))) === 'string') // eslint-disable-line no-new-wrappers
    })
  })

  describe('should point out "special" Number types as their own types', function () {
    it('NaN', function () {
      assert(whatis(NaN) === 'NaN')
      assert(whatis(-NaN) === 'NaN')
      assert(whatis(NaN - NaN) === 'NaN')
      assert(whatis(NaN + NaN) === 'NaN')
      assert(whatis(NaN + null) === 'NaN')
      assert(whatis(null - NaN) === 'NaN')
      assert(whatis(NaN + 1) === 'NaN')
      assert(whatis(null / null) === 'NaN')
      assert(whatis({} - {}) === 'NaN')
    })

    it('Infinity', function () {
      assert(whatis(Infinity) === 'Infinity')
      assert(whatis(-Infinity) === 'Infinity')
      assert(whatis(1 / 0) === 'Infinity')
    })
  })

  describe('should recognize some common types of built-in objects', function () {
    it('function arguments', function () {
      assert(whatis(arguments) === 'arguments')
    })

    it('Array', function () {
      assert(whatis([]) === 'array')
      assert(whatis([ 1, null, 'array' ]) === 'array')
      assert(whatis(new Array(10)) === 'array')
    })

    it('Date', function () {
      assert(whatis(new Date()) === 'date')
      assert(whatis(new Date('1981-01-03')) === 'date')
    })

    it('Error', function () {
      assert(whatis(new Error('some error')) === 'error')
      assert(whatis(new TypeError('you are not my type!')) === 'error')
      assert(whatis(new RangeError('WHA?!')) === 'error')

      try {
        whatis(unknownVariable) // eslint-disable-line no-undef
      } catch (e) {
        assert(whatis(e) === 'error')
      }

      try {
        throw new Error('ARRR!')
      } catch (e) {
        assert(whatis(e) === 'error')
      }
    })

    it('Function', function () {
      assert(whatis(noop) === 'function')
      assert(whatis(describe) === 'function')
      assert(whatis(it) === 'function')
      assert(whatis(assert) === 'function')
      assert(whatis(new Function('return null;')) === 'function') // eslint-disable-line no-new-func
    })

    it('Object', function () {
      assert(whatis({}) === 'object')
      assert(whatis({ foo: 'bar' }) === 'object')
      assert(whatis({ method: noop }) === 'object')
      assert(whatis(new Object()) === 'object') // eslint-disable-line no-new-object
      assert(whatis(Object.create(Object.prototype)) === 'object')

      var ObjectCreateNull = Object.create(null)

      assert(whatis(ObjectCreateNull) === 'object')

      ObjectCreateNull['foo'] = 'bar'

      assert(whatis(ObjectCreateNull) === 'object')
    })

    it('Promise', function () {
      assert(whatis(new Promise(noop)) === 'promise')
      assert(whatis(Promise.resolve('data')) === 'promise')
      assert(whatis(Promise.reject('error!').catch(noop)) === 'promise') // eslint-disable-line prefer-promise-reject-errors
    })

    it('RegExp', function () {
      assert(whatis(/^needle$/mi) === 'regexp')
      assert(whatis(new RegExp('needle')) === 'regexp')
    })
  })

  describe('should also handle any type of class-like functions', function () {
    it('new MyClass()', function () {
      function MyClass (name) { this.name = name };
      assert(whatis(new MyClass()) === 'myclass')
    })

    it('new noop()', function () {
      assert(whatis(new noop()) === 'noop') // eslint-disable-line new-cap
    })
  })
})
