# broccoli-less

The broccoli-less plugin compiles `.less` files with
[Less.js] and is based off of the [broccoli-sass] plugin.

## Usage

```js
var compileLess = require('broccoli-less');

var outputTree = compileLess(inputTrees, inputFile, outputFile, options)
```

* **`inputTrees`**: An array of trees that act as the include paths for
  libsass. If you have a single tree, pass `[tree]`.

* **`inputFile`**: Relative path of the main `.less` file to compile. This
  file must exist in one of the `inputTrees`.

* **`outputFile`**: Relative path of the output CSS file.

* **`options`**: A hash of options for the less compiler.

### Example

```js
var appCss = compileLess(sourceTrees, 'myapp/app.less', 'assets/app.css')
```

[Less.js]: https://github.com/less/less.js
[broccoli-sass]: https://github.com/joliss/broccoli-sass
