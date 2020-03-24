/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const componentGenerator = require('./component/index.js')
const storeGenerator = require('./store/index.js')
const registerActions = require('./config/registerActions.js')
const registerHelpers = require('./config/registerHelpers.js')
const registerPartials = require('./config/registerPartials.js')

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
  registerActions(plop)
  registerHelpers(plop)
  registerPartials(plop)
}
