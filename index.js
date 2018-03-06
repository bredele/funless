
/**
 * Expose function to avoid maxmum call stack.
 */

module.exports = funless


/**
 * Traverse value and subsitute functions with their value.
 *
 * @param {Object} obj
 * @return {Object}
 * @api public
 */

function funless (value) {
  const type = typeof value
  if (type === 'object') {
    return object(value)
  } else if (type === 'function') {
    return value()
  }
  return value
}


/**
 * Traverse object.
 *
 * @param {Object} obj
 * @return {Object}
 * @api public
 */

function object(obj) {
  Object.keys(obj).map(key => {
    obj[key] = funless(obj[key])
  })
  return obj
}
