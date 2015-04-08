var Reflux = require('reflux');

var <%= lodash.capitalize(path.basename(actionsName) + 'Actions') %> = Reflux.createActions([
  'queryAll'
  // Here you can list your actions
]);

module.exports = <%= lodash.capitalize(path.basename(actionsName) + 'Actions') %>;
