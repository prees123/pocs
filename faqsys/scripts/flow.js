// imports
const fs = require('fs')
const path = require('path')
const flow = require('flow-bin')
const spawn = require('child_process').spawn

// config
const WATCH_PATH = './../../src'
const WATCH_PARAM = '--watch'

// destructure `process.argv`
const [ /* nodeDir */, scriptPath, ...processArgs ] = process.argv // eslint-disable-line standard/array-bracket-even-spacing

// add `--watch` flag to `yarn flow`
if (processArgs.find(arg => arg === WATCH_PARAM)) {
  const absolutePath = path.resolve(scriptPath, WATCH_PATH)
  const filteredArgs = processArgs.filter(arg => arg !== WATCH_PARAM)

  fs.stat(absolutePath, (err, stats) => {
    if (err || !stats.isDirectory()) {
      process.stdout.write('Error resolving path to `react-praxis/src`')
      process.exit(1)
    }

    fs.watch(absolutePath, { recursive: true }, (eventType, filename) => {
      if (filename) {
        getFlowStatus(filteredArgs)
      }
    })
  })

  // run on start
  getFlowStatus(filteredArgs)
} else {
  getFlowStatus(processArgs)
}

// the magic
function getFlowStatus (args) {
  spawn(flow, ['status'].concat(args), { stdio: 'inherit' })
}
