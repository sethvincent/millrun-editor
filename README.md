# millrun-editor

Basic markdown editor component created for [millrun](https://github.com/cityarcade/millrun).

## Usage

```js
var createEditor = require('millrun-editor')

var editor = createEditor()
var state = { content: '# new draft '}

var tree = editor(state, function (action, data) {
  console.log(action, data)
})

document.body.appendChild(tree)
```
