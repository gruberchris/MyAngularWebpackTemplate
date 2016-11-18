const testsContext = require.context("./src", true, /.spec.js$/);
testsContext.keys().forEach(testsContext);

const appSourceContext = require.context("./src", true, /.js$/);
appSourceContext.keys().forEach(appSourceContext);
