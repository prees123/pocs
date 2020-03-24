'use strict'

module.exports = function (plop) {
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'))

  plop.addHelper('snakeCase', (object) => object.toUpperCase().split(' ').join('_'))

  plop.addHelper('eq', (...args) => {
    const [options, ...values] = args.reverse()

    let res = true

    // if `eq` is called with a single arg, coerce to boolean
    if (values.length === 1) {
      res = false
    } else {
      for (let key = 0; key < values.length; key++) {
        const curr = values[key]
        const next = values[key + 1]

        if (next !== undefined && curr !== next) {
          res = false
          break
        }
      }
    }

    if (res) {
      return options.fn(this)
    }

    return ''
  })
}
