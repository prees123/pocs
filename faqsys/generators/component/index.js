/**
 * Component Generator
 */

'use strict'

const STATELESS_FUNCTION = 'Stateless Function'
const ES6_CLASS = 'ES6 Class'

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'A configurable component',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: 'Stateless Function',
    choices: [
      { name: STATELESS_FUNCTION, value: STATELESS_FUNCTION },
      { name: ES6_CLASS, value: ES6_CLASS },
    ],
  }, {
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true
      }

      return 'The name is required'
    },
  }, {
    type: 'confirm',
    name: 'isStyled',
    message: 'Do you want styles?',
    default: true,
  }, {
    type: 'confirm',
    name: 'isConnected',
    message: 'Is this component connected to the store?',
    default: false,
  }, {
    type: 'confirm',
    name: 'hasFlow',
    message: 'Do you want flow types?',
    default: true,
  }],
  actions: (data) => {
    const templateMap = {
      [STATELESS_FUNCTION]: './component/stateless.js.hbs',
      [ES6_CLASS]: './component/es6.js.hbs',
    }

    const actions = [{
      type: 'add',
      path: '../src/components/{{properCase name}}/{{properCase name}}.js',
      templateFile: templateMap[data.type],
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../src/components/{{properCase name}}/__tests__/{{properCase name}}.test.js',
      templateFile: './component/test.js.hbs',
      abortOnFail: true,
    }, {
      type: 'cleanWhiteSpace',
    }]

    return actions
  },
}
