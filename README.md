# rollup-plugin-browser-resolve [<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" alt="Colorwheel" width="90" height="90" align="right">][rollup-plugin-browser-resolve]

[![Build Status][cli-img]][cli-url]
[![Licensing][lic-img]][lic-url]
[![Changelog][log-img]][log-url]

[rollup-plugin-browser-resolve] is a [rollup] plugin that locates modules using the Node resolution algorithm and excludes scripts not required by [browserslist].

```sh
npm install --save-dev jonathantneal/rollup-plugin-browser-resolve
```

Use the [rollup-plugin-browser-resolve] plugin with [rollup] before [rollup-plugin-node-resolve].

```js
rollup({
  entry: entry,
  plugins: [
    require('rollup-plugin-browser-resolve')(/* Options */),
    require('rollup-plugin-node-resolve')()
  ]
})
```

The import may specify the targetted browsers in its package.json.

```json
{
  "browserstarget": [
    "Chrome < 50"
  ]
}
```

If the project meets those browser requirements, the import will be included.

```json
{
  "browserslist": [
    "Chrome >= 40"
  ]
}
```

Otherwise, the import will be skipped.

```json
{
  "browserslist": [
    "Chrome >= 54"
  ]
}
```

### Options

```js
{
  // use "module" field for ES6 module if possible
  module: false,  // Default: true
  // use "jsnext:main" if possible
  jsnext: true,   // Default: false
  // supported browserslist
  browsers: [],   // Default: null
  // directory to lookup browserslist
  from: __dirname // Default: process.cwd()
}
```

[browserslist]: https://github.com/ai/browserslist
[rollup]: http://rollupjs.org/
[rollup-plugin-browser-resolve]: https://github.com/jonathantneal/rollup-plugin-browser-resolve
[rollup-plugin-node-resolve]: https://github.com/rollup/rollup-plugin-node-resolve

[npm-url]: https://www.npmjs.com/package/rollup-plugin-browser-resolve
[npm-img]: https://img.shields.io/npm/v/rollup-plugin-browser-resolve.svg
[cli-url]: https://travis-ci.org/jonathantneal/rollup-plugin-browser-resolve
[cli-img]: https://img.shields.io/travis/jonathantneal/rollup-plugin-browser-resolve.svg
[lic-url]: LICENSE.md
[lic-img]: https://img.shields.io/badge/license-CC0--1.0-blue.svg
[log-url]: CHANGELOG.md
[log-img]: https://img.shields.io/badge/changelog-md-blue.svg
