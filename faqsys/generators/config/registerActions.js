/**
 * Registers plop actions
 */

const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

function cleanWhiteSpaceAction (answers, config, plop) {
  const properCaseName = plop.handlebars.helpers.properCase(answers.name)
  const rootPath = `src/components/${properCaseName}/${properCaseName}.js`
  const relativePath = `../../${rootPath}`
  const absolutePath = path.resolve(__dirname, relativePath)

  return new Promise((resolve, reject) => {
    fs.stat(absolutePath, (err, stats) => {
      if (err || !stats) {
        reject(new Error(`\`cleanWhiteSpace\` can not find file \`${absolutePath}\``))
      } else {
        // todo: switch to configurable amount of fixes
        exec(`esw src/components/${properCaseName}/${properCaseName}.js --fix`, (err, stdout, stderr) => {
          if (err) {
            reject(new Error(`exec error: ${err}`))
          } else {
            resolve(`cleaned ${properCaseName}`)
          }
        })
      }
    })
  })
}

module.exports = function (plop) {
  plop.setActionType('cleanWhiteSpace', cleanWhiteSpaceAction)
}
