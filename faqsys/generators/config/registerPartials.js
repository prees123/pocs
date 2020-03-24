/**
 * Registers component specific partials for plop to understand
 */

const fs = require('fs')
const path = require('path')

module.exports = function (plop) {
  const partials = [{
    name: 'componentExportPartial',
    path: '../component/partials/export.hbs',
  }, {
    name: 'componentImportPartial',
    path: '../component/partials/import.hbs',
  }]

  partials.forEach(partial => {
    const partialPath = path.resolve(__dirname, partial.path)

    plop.setPartial(partial.name, fs.readFileSync(partialPath).toString())
  })
}
