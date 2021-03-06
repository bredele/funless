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


test('should work with array containing objects', assert => {
  assert.plan(1)
  assert.deepEqual(funless([() => 'john', {
    beep: () => 'boop'
  }]), ['john', {
    beep: 'boop'
  }])
})

test('should work with array containing nested objects', assert => {
  assert.plan(1)
  assert.deepEqual(funless([() => 'john', {
    beep: {
      boop: () => 'hello'
    }
  }]), ['john', {
    beep: {
      boop: 'hello'
    }
  }])
})


test('should have a compare mode', assert => {
  assert.plan(1)
  assert.deepEqual(funless({
    foo: {
      bar: (name) => 'beep ' + name
    }
  }, {
    foo: {
      bar: 'boop'
    }
  }, true), {
    foo: {
      bar: 'beep boop'
    }
  })
})

test('should pass null if compare mode on and object key does not exist', assert => {
  assert.plan(1)
  assert.deepEqual(funless({
    foo: {
      bar: (name) => 'beep ' + (name || '')
    }
  }, {
    foo: {
      beep: 'boop'
    }
  }, true), {
    foo: {
      bar: 'beep '
    }
  })
})

test('should pass null if compare mode on and object to compare does not exist', assert => {
  assert.plan(1)
  assert.deepEqual(funless({
    foo: {
      bar: (name) => 'beep ' + (name || '')
    }
  }, null, true), {
    foo: {
      bar: 'beep '
    }
  })
})

// test('compare mode should work with arrays as well', assert => {
//   assert.plan(1)
//   assert.deepEqual(funless(['hello', {
//     foo: {
//       bar: (name) => 'beep ' + (name || '')
//     }
//   }], ['something', {
//     foo: {
//       bar: 'boop'
//     }
//   }], true), ['hello', {
//     foo: {
//       bar: 'beep boop'
//     }
//   }])
// })


test('a final test', assert => {
  assert.plan(1)
  assert.deepEqual(funless([() => 'john', {
    beep: {
      boop: ['hello', {
        foo: {
          bar: () => 'world'
        }
      }]
    }
  }]), ['john', {
    beep: {
      boop: ['hello', {
        foo: {
          bar: 'world'
        }
      }]
    }
  }])
})
