/* global describe, it */
var util = require('util')
var expect = require('chai').expect
var sentenceCase = require('./')

/**
 * Automatically generate test suite from the array of rules.
 *
 * @type {Array}
 */
var TESTS = [
  // Single words.
  ['test', 'test'],
  ['TEST', 'test'],

  // Camel case.
  ['testString', 'test string'],
  ['testString123', 'test string123'],
  ['testString_1_2_3', 'test string 1 2 3'],
  ['x_256', 'x 256'],
  ['anHTMLTag', 'an html tag'],
  ['ID123String', 'id123 string'],
  ['Id123String', 'id123 string'],
  ['foo bar123', 'foo bar123'],
  ['a1bStar', 'a1b star'],

  // Constant case.
  ['CONSTANT_CASE ', 'constant case'],
  ['CONST123_FOO', 'const123 foo'],

  // Random cases.
  ['FOO_bar', 'foo bar'],

  // Non-alphanumeric separators.
  ['dot.case', 'dot case'],
  ['path/case', 'path case'],
  ['snake_case', 'snake case'],
  ['snake_case123', 'snake case123'],
  ['snake_case_123', 'snake case 123'],

  // Punctuation.
  ['"quotes"', 'quotes'],

  // Space between number parts.
  ['version 0.45.0', 'version 0 45 0'],
  ['version 0..78..9', 'version 0 78 9'],
  ['version 4_99/4', 'version 4 99 4'],

  // Odd input.
  [null, ''],
  [undefined, ''],
  [10, '10'],
  [{ toString: function () { return 'test' } }, 'test'],

  // Whitespace.
  ['  test  ', 'test'],

  // Non-ascii characters.
  ['español', 'español'],
  ['Beyoncé Knowles', 'beyoncé knowles'],
  ['Iñtërnâtiônàlizætiøn', 'iñtërnâtiônàlizætiøn'],

  // Number string input.
  ['something_2014_other', 'something 2014 other'],

  // Custom replacement character
  ['HELLO WORLD!', 'hello_world', null, '_'],

  // Custom locale.
  ['A STRING', 'a strıng', 'tr'],

  // https://github.com/blakeembrey/change-case/issues/21
  ['amazon s3 data', 'amazon s3 data'],
  ['foo_13_bar', 'foo 13 bar']
]

describe('sentence case', function () {
  TESTS.forEach(function (test) {
    var before = test[0]
    var after = test[1]
    var locale = test[2]
    var replacement = test[3]

    it(util.inspect(before) + ' -> ' + util.inspect(after), function () {
      expect(sentenceCase(before, locale, replacement)).to.equal(after)
    })
  })
})
