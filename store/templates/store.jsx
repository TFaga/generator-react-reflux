var Reflux = require('reflux');

var data = [];

var <%= lodash.capitalize(path.basename(storeName) + 'Store') %> = Reflux.createStore({

  init: function() {
    console.log('<%= lodash.capitalize(path.basename(storeName) + "Store") %> initialized');
    // This funciton will be called when the store will be first initialized
  }

});

module.exports = <%= lodash.capitalize(path.basename(storeName) + 'Store') %>;
