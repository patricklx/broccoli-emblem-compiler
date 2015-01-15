# broccoli-emblem-compiler

Emblem.js precompiler for projects that use broccoli
Compiles emblem to htmlbars

requires (add them to your project):
- htmlbars: 0.7
- handlebars: git://github.com/mmun/handlebars.js#new-ast-3238645f

## Installation

```bash
npm install --save broccoli-emblem-compiler
```

## Usage Example

```js
var filterTemplates = require('broccoli-emblem-compiler');
tree = filterTemplates();
```
