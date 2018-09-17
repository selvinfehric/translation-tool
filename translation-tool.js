const fs = require('fs')
const path = require('path')
const walkSync = require('./lib/walksync.js')
const commandLineArgs = require('./lib/commandLineArgs.js')
const commandLineUsage = require('./lib/commandLineUsage.js')
const config = require('config')

if (commandLineArgs.help) {
  console.log(commandLineUsage)
  process.exit()
}

if (!commandLineArgs.source || !commandLineArgs.input || !commandLineArgs.output) {
  console.error('Source, input and output parameters are required. Use node tool.js --help to see usage.')
  process.exit()
}

const absoluteInputPath = path.resolve(__dirname, commandLineArgs.input)
const absoluteOutputPath = path.resolve(__dirname, commandLineArgs.output)
const absoluteSourcePath = path.resolve(__dirname, commandLineArgs.source)

const translations = JSON.parse(fs.readFileSync(absoluteInputPath, 'utf8'))

Object.keys(translations).map(language => {
  const item = translations[language]
  item.language = language
  return item
}).forEach(languageObject => {
  console.log('language ' + languageObject.language)
  Object.keys(languageObject).forEach(translationKey => {
    var found = false
    for (const file of walkSync(absoluteSourcePath)) {
      if (path.extname(file) !== '.js') {
        if (fs.readFileSync(file).indexOf(translationKey) >= 0) {
          found = true
          break
        }
      }
    }
    if (!found) {
      console.log('NOT FOUND', translationKey)
      if (config.removeUnusedValues) {
        translations[languageObject.language][translationKey] = null
      } else {
        translations[languageObject.language][translationKey] = config.replaceUnusedValuesWith ? config.replaceUnusedValuesWith : '#NOTFOUND#'
      }
    }
  })

  if (config.addMissingKeysFromDefaultLanguage) {
    var languageKey = config.defaultLanguage ? config.defaultLanguage : 'en'
    if (languageKey !== languageObject.language) {
      Object.keys(translations[languageKey]).forEach(translationKey => {
        if (!(translationKey in translations[languageObject.language])) {
          console.log('NOT TRANSLATED', translationKey)
          translations[languageObject.language][translationKey] = config.replaceNotTranslatedValuesWith ? config.replaceNotTranslatedValuesWith : '#NOTTRANSLATED#'
        }
      })
    }
  }
  translations[languageObject.language]['language'] = null
})

function removeNulls (key, value) {
  if (value !== null) return value
}

fs.writeFile(absoluteOutputPath, JSON.stringify(translations, removeNulls, config.spacing ? config.spacing : 4), 'utf8', function (err) {
  if (err) return console.log(err)
})
