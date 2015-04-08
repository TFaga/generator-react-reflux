Reflux = require 'reflux'

data = []

<%= lodash.capitalize(path.basename(storeName) + 'Store') %> = Reflux.createStore

  init: ->
    console.log '<%= lodash.capitalize(path.basename(storeName) + "Store") %> initialized'
    # This funciton will be called when the store will be first initialized


module.exports = <%= lodash.capitalize(path.basename(storeName) + 'Store') %>
