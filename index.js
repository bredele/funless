
/**
 * Expose function to avoid maxmum call stack.
 */

module.exports = funless



/**
 * Traverse type and subsitute functions with their value.
 *
 * @param {Object} obj
 * @param {Any?} arg
 * @param {Boolean?} compare mode (pass the coresponding key from arg)
 * @return {Object}
 * @api public
 */

function funless (value, arg, compare) {
  const type = typeof value
  if (type === 'object') {
    return object(value, arg, compare)
  } else if (type === 'function') {
    return value(arg)
  }
  return value
}


/**
 * Traverse object.
 *
 * @param {Object} obj
 * @param {Any?} arg
 * @param {Boolean?} compare mode (pass the coresponding key from arg)
 * @return {Object}
 * @api public
 */

function object(obj, arg, compare) {
  Object.keys(obj).map(key => {
    if (compare) arg = property(arg, key)
    obj[key] = funless(obj[key], arg, compare)
  })
  return obj
}



/**
 * Return argument property.
 *
 * @param {Any} arg
 * @param {Any} key
 * @api private
 */

function property (arg, key) {
  return arg ? arg[key] : null
}
