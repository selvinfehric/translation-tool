# Translation tool

The Translation tool is used for finding missing translations, finding unused keys in source code and remove/update them in translations file, adding missing translations to other languages than default and much more.

## Installation

Prerequisites for this tool are node and git. The tool can be installed by cloning this repository and installing dependencies:
```
    git clone https://github.com/selvinfehric/translation-tool.git
    cd translation-tool
    npm install
```

## Usage

When using the tool from a command line, you need to pass three parameters: source (where do you keep your code), input (input translation file), output (output translation file) as in the example below:
```
    node translation-tool.js --input ../project1/resources/locales.json --output ../project1/resources/locales-new.json --source ../project1/src/
```

If your *translation-tool* folder is in the same folder as your *project1* folder, then this command will trigger search inside *src* directory of your *project1* for all keys located in *resources/locales.json* and generate a new file called *resources/locales-new.json* as a result.

## Configuration

You can configure what do you want this tool do for you. Default configuration contains:

```json
{
    "removeUnusedValues": false,
    "replaceUnusedValuesWith": "#NOTFOUND#",
    "addMissingKeysFromDefaultLanguage": true,
    "defaultLanguage": "en",
    "replaceNotTranslatedValuesWith": "#NOTTRANSLATED#",
    "spacing": 4
}
```

* *removeUnusedValues* - If true, the tool will remove unused translation keys from output translation file
* *replaceUnusedValuesWith* - If *removeUnusedValues* is false, this string will be used as value for unused keys
* *addMissingKeysFromDefaultLanguage* - If true, the tool will find missing translation keys in other language comparing to default
* *defaultLanguage* - Default language used when finding missing keys in other languages
* *replaceNotTranslatedValuesWith* - String used as value when finding missing keys in other languages
* *spacing* - Spacing used when generating new translations file

## File formats

Input and output file format currently supported:

```json
{
    "en":{
        "Hello": "Hello",
        "Hello %s, how are you today?": "Hello %s, how are you today?",
        "weekend": "weekend",
        "Hello %s, how are you today? How was your %s.": "Hello %s, how are you today? How was your %s.",
        "Hi": "Hi",
        "Howdy": "Howdy"
    },
    "de":{
        "Hello": "Hallo",
        "Hello %s, how are you today?": "Hallo %s, wie geht es dir heute?",
        "weekend": "Wochenende",
        "Hello %s, how are you today? How was your %s.": "Hallo %s, wie geht es dir heute? Wie war dein %s.",
        "Hi": "Hi",
        "Howdy": "Hallöchen"
    }
}
```

Plan is to support localization files divided per language too. E.g. locales/en.json, locales/de.json etc.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request 

## License

This project is licensed under the terms of the MIT license.