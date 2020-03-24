/**
 * Component Generator
 */

'use strict'

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'A section in redux store',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'products',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A store with this name already exists' : true
      }

      return 'The name is required'
    },
  }, {
    type: 'input',
    name: 'actionName',
    message: 'Initial action name?',
    default: 'set value',
  }],
  actions: (data) => {
    const actions = [{
      type: 'add',
      path: '../src/store/{{camelCase name}}/actionCreator.js',
      templateFile: './store/actionCreator.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/store/{{camelCase name}}/__tests__/actionCreator.test.js',
      templateFile: './store/actionCreator.test.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/store/{{camelCase name}}/actionType.js',
      templateFile: './store/actionType.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/store/{{camelCase name}}/reducer.js',
      templateFile: './store/reducer.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/store/{{camelCase name}}/__tests__/reducer.test.js',
      templateFile: './store/reducer.test.js.hbs',
      abortOnFail: true,
    }]

    return actions
  },
}
