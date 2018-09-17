const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'input', type: String },
  { name: 'output', type: String },
  { name: 'source', type: String, defaultOption: true },
  { name: 'help', alias: 'h', type: Boolean }
]
module.exports = commandLineArgs(optionDefinitions)
