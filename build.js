var fs = require('fs')
var join = require('path').join
var XRegExp = require('xregexp').XRegExp

/**
 * Write regular expressions to a file for reuse. Avoids requiring XRegExp as
 * a dependency in the users application.
 *
 * @param {String} file
 * @param {RegExp} regexp
 */
var write = function (file, regexp) {
  var content = 'module.exports = ' + regexp.toString() + '\n'
  var filename = join(__dirname, 'vendor', file)

  return fs.writeFileSync(filename, content)
}

// Write regexps.
write('non-word-regexp.js', new XRegExp('[^\\p{L}\\p{N}]+', 'g'))
write('camel-case-regexp.js', new XRegExp('(\\p{Ll})([\\p{Lu}\\p{N}])', 'g'))
write('camel-case-capital-regexp.js', new XRegExp('(\\p{Lu}+)(\\p{Lu}\\p{Ll})', 'g'))
write('trailing-digit-regexp.js', new XRegExp('(\\p{N})(\\p{^N})', 'g'))
