
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

function funless (value, ...args) {
  const type = typeof value
  if (type === 'object') {
    return object(value, ...args)
  } else if (type === 'function') {
    return value(...args)
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

function object(obj, ...args) {
  Object.keys(obj).map(key => {
    obj[key] = funless(obj[key], ...args)
  })
  return obj
}
