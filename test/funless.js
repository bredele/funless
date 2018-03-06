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
