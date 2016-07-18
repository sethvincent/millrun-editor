var css = require('sheetify')
var createEditor = require('../index')

css('./style.css', { global: true })
var editor = createEditor()
var state = { content: '# new draft '}

var tree = editor(state, function (action, data) {
  console.log(action, data)
})

document.body.appendChild(tree)
