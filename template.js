var templates;

try {
  templates = angular.module("{{module}}");
}
catch (e) {
  // It's not defined yet
  templates = angular.module("{{module}}", []);
}

templates.run([
  "$templateCache",

  function($templateCache) {
    $templateCache.put("{{path}}", "{{content}}");
  }
]);

module.exports = "{{path}}";