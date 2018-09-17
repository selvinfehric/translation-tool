const commandLineUsage = require('command-line-usage')

const sections = [
  {
    header: 'Translation tool',
    content: 'Generates something {italic very} important.'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'input',
        typeLabel: '{underline file}',
        defaultOption: true,
        description: 'The translation input file to process.'
      },
      {
        name: 'output',
        typeLabel: '{underline file}',
        defaultOption: true,
        description: 'The translation output file to generate.'
      },
      {
        name: 'src',
        typeLabel: '{underline file} ...',
        multiple: true,
        defaultOption: true,
        description: 'The input files to process.'
      },
      {
        name: 'help',
        description: 'Print usage guide.'
      }
    ]
  }
]
module.exports = commandLineUsage(sections)
