#!/usr/bin/env node

const
  path = require('path')

const fs = require('fs')

/**
 * List all files in a directory recursively in a synchronous fashion
 *
 * @param {String} dir
 * @returns {IterableIterator<String>}
 */
function * walkSync (dir) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const pathToFile = path.join(dir, file)
    const isDirectory = fs.statSync(pathToFile).isDirectory()
    if (isDirectory) {
      yield * walkSync(pathToFile)
    } else {
      yield pathToFile
    }
  }
}

module.exports = walkSync
