/**
 * Module dependencies
 */

var fs = require('fs');
var path = require('path');
var read = fs.readFileSync;

/**
 * Load the angular cache template
 */

var template = read(path.join(__dirname, 'template.js'), 'utf8');

/**
 * Expose plugin
 *
 * @param {Object} options
 */

module.exports = function(options) {
  if (!options) options = {};
  options.extension = options.extension || '.nghtml';
  if (!Array.isArray(options.extension)) options.extension = [options.extension];
  options.webroot = options.webroot || '';
  options.dev = typeof options.dev == 'undefined' ? false : options.dev;
  options.confProp = options.confProp || 'templates';

  var nextLineEscape = options.dev ? "\"+\n\"" : ' ';

  return function(builder) {
    builder.hook('before scripts', function(pkg) {

      var templates = (pkg.config || pkg.conf)[options.confProp];
      if (!templates) return;

      templates.forEach(function(file){
        var ext = path.extname(file);
        if (!~options.extension.indexOf(ext)) return;

        var relativePath = path.relative(
          pkg.path(options.webroot),
          pkg.path(file)
        );

        var filename = pkg.path(file);

        var contents = read(filename, 'utf8');

        if (options.hook) contents = options.hook(contents, filename);

        var js = compile(
          contents,
          relativePath,
          options.module || pkg.config.name,
          nextLineEscape
        );
        var newFile = path.dirname(file) + '/' + path.basename(file, options.extension) + '.js';
        pkg.addFile('scripts', newFile, js);
      });
    });
  };
};

function compile(html, file, module, nextLineEscape) {
  return template
    .replace(/\{\{path\}\}/g, JSON.stringify('/' + file))
    .replace(/\{\{module\}\}/g, JSON.stringify(module))
    .replace(/\{\{content\}\}/g, JSON.stringify(html
      .replace(/\n/g, nextLineEscape)));
};
