var assert = require('assert')
var html = require('yo-yo')
var css = require('sheetify')
var codemirror = require('codemirror')
require('codemirror/addon/mode/overlay')
require('codemirror/addon/edit/continuelist')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/markdown/markdown')
require('codemirror/mode/gfm/gfm')
require('codemirror/mode/xml/xml')
require('codemirror/mode/htmlmixed/htmlmixed')

var format = require('./format')

module.exports = function createEditor (options) {
  
  css('codemirror/lib/codemirror.css', { global: true })
  css('./style.css', { global: true })

  var prefix = css`
   :host {
     height: 100%;
   }

   #editor {
     height: 100%;
   }
  `

  var el = html`<div id="editor"></div>`
  var editor = codemirror(el, {
    theme: 'millrun',
    mode: 'gfm',
    autofocus: true,
    lineNumbers: false,
    matchBrackets: true,
    lineWrapping: true,
    extraKeys: { 'Enter': 'newlineAndIndentContinueMarkdownList' }
  })

  function render (params) {
    assert.ok(params)
    assert.ok(params.onChange)
    var onChange = params.onChange

    var element = html`<div class="editor-wrapper ${prefix}" onload=${onload} onunload=${onunload}>
      ${el}
    </div>`

    function change () {
      var value = editor.getValue()
      if (value.length) {
        onChange(format({
          key: params.key,
          value: value,
          firstLine: editor.getLine(0),
          lineCount: editor.lineCount()
        }))
      }
    }

    function onload (el) {
      editor.on('change', change)
    }

    function onunload (el) {
      editor.off('change', change)
    }

    if (params.content) {
      editor.setValue(params.content)
    }

    setTimeout(function () {
      editor.refresh()
    }, 0)

    editor.containerEl = element
    return element
  }

  render.editor = editor
  return render
}
