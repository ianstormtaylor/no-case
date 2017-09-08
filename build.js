var fs = require('fs')
var join = require('path').join
var XRegExp = require('xregexp')
var jsesc = require('jsesc')

/**
 * Write regular expressions to a file for reuse. Avoids requiring XRegExp as
 * a dependency in the users application.
 *
 * @param {string} filename
 * @param {RegExp} regexp
 */
var write = function (filename, regexp) {
  var content = 'module.exports = ' + jsesc(regexp.toString()) + '\n'
  var path = join(__dirname, 'vendor', filename)

  return fs.writeFileSync(path, content)
}

// Write regexps.
write('non-word-regexp.js', new XRegExp('[^\\p{L}\\p{N}]+', 'g'))
write('camel-case-regexp.js', new XRegExp('([\\p{Ll}\\p{N}])(\\p{Lu})', 'g'))
write('camel-case-upper-regexp.js', new XRegExp('(\\p{Lu})(\\p{Lu}\\p{Ll})', 'g'))
