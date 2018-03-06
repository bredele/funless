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


test('should not change object propertiea that are not functions', assert => {
  assert.plan(1)
  assert.deepEqual(funless({
    foo: 'bar',
    name: () => 'john'
  }), {
    foo: 'bar',
    name: 'john'
  })
})


// test('should traverse object and substitute all functions', assert => {
//   assert.plan(1)
//   assert.deepEqual(funless({
//     bar: () => 'boop',
//     hello: 'world',
//     foo: {
//       bar: () => 'beep'
//     }
//   }), {
//     bar: 'boop',
//     hello: 'world',
//     foo: {
//       bar: 'beep'
//     }
//   })
// })
