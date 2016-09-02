var removeMarkdown = require('remove-markdown')
var removeNewline = require('newline-remove')
var wordCount = require('wordcount')
var md = require('marked')

module.exports = function formatDraft (options) {
  if (typeof options === 'string') {
    options = { value: options }
  }

  options = options || { value: '' }

  if (!options.firstLine) {
    options.firstLine = options.value.split('\n')[0]
  }

  if (!options.lineCount) {
    options.lineCount = options.value.split('\n').length
  }

  var value = options.value
  var text = removeMarkdown(value)
  var title = removeNewline(removeMarkdown(options.firstLine))

  var draft = {
    title: title,
    markdown: value,
    html: md(value),
    slug: title.replace(' ', '-'),
    word_count: wordCount(text),
    character_count: text.length,
    line_count: options.lineCount
  }

  if (options.key) draft.key = options.key
  return draft
}
