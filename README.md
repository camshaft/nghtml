nghtml
======

Component plugin for Angular.js Templates

Usage
-----

```js
var nghtml = require("nghtml");

builder.use(nghtml({
  webroot: "public",
  module: "app",
  dev: true,
  hook: function(contents, done) {
    return processedContents;
  }
}));

```

Options
-------

### extenstion
Extension to look for. Defaults to `.nghtml`

### webroot
Path relative to the project root where the files are being served, for example `public`. This defaults to nothing.

### module
The module in which to cache the templates. Defaults to `templates`.

### dev
Boolean value to specify dev mode. This enables next-lines on the cached tempaltes. Defaults to `false`

### hook
Function to process the html output