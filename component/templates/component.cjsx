React = require 'react'

<%= lodash.capitalize(path.basename(componentName)) %> = React.createClass

  render: ->

    return (
      <div>
        <p>Your content</p>
      </div>
    )

module.exports = <%= lodash.capitalize(path.basename(componentName)) %>
