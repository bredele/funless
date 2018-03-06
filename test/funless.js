/**
 * Dependencie(s)
 */

const test = require('tape')
const funless = require('..')


test('should substitute value returned by a function in ab object', assert => {
  assert.plan(1)
  assert.deepEqual(funless({
    name: () => 'john'
  }), {
    name: 'john'
  })
})


test('should not change object properties that are not functions', assert => {
  assert.plan(1)
  assert.deepEqual(funless({
    foo: 'bar',
    name: () => 'john'
  }), {
    foo: 'bar',
    name: 'john'
  })
})


test('should traverse object and substitute all functions', assert => {
  assert.plan(1)
  assert.deepEqual(funless({
    bar: () => 'boop',
    hello: 'world',
    foo: {
      bar: () => 'beep'
    }
  }), {
    bar: 'boop',
    hello: 'world',
    foo: {
      bar: 'beep'
    }
  })
})


test('should pass arguments to function before substitution', assert => {
  assert.plan(1)
  assert.deepEqual(funless({
    foo: 'bar',
    name: (name) => 'hello ' + name
  }, 'john'), {
    foo: 'bar',
    name: 'hello john'
  })
})


test('should traverse object and substitute all functions', assert => {
  assert.plan(1)
  assert.deepEqual(funless({
    bar: (name) => 'boop and ' + name,
    hello: 'world',
    foo: {
      bar: (name) => 'beep and ' + name
    }
  }, 'john'), {
    bar: 'boop and john',
    hello: 'world',
    foo: {
      bar: 'beep and john'
    }
  })
})


test('should work with array', assert => {
  assert.plan(1)
  assert.deepEqual(funless([() => 'john']), ['john'])
})
