React = require 'react'

<%= _.camelize('_' + path.basename(componentName)) %> = React.createClass

  render: ->

    return (
      <div>
        <p>Your content</p>
      </div>
    )

module.exports = <%= _.camelize('_' + path.basename(componentName)) %>
