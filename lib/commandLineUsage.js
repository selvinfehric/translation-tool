const commandLineUsage = require('command-line-usage')

const sections = [
  {
    header: 'Translation tool',
    content: 'Translation tool is used for finding missing translations, finding unused keys in source code and remove/update them in translations file, adding missing translations to other languages than default and much more.'
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
        description: 'The translation output file generated after processing input file.'
      },
      {
        name: 'source',
        typeLabel: '{underline folder}',
        defaultOption: true,
        description: 'Folder containing source files to process.'
      },
      {
        name: 'help',
        description: 'Print usage guide.'
      }
    ]
  }
]
module.exports = commandLineUsage(sections)
