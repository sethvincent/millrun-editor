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

module.exports = function createEditor (options) {
  css('codemirror/lib/codemirror.css')
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

  function render (state, send) {
    var element = html`<div class="editor-wrapper ${prefix}" onload=${onload}>
      ${el}
    </div>`

    function onload (el) {
      editor.setValue(state.content)
      editor.on('change', function () {
        send('editor:change', { content: editor.getValue() })
      })
    }

    editor.containerEl = element
    return element
  }

  render.editor = editor
  return render
}
