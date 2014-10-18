React = require 'react'

Layout = React.createClass

  render: ->

    return (
      <div className="App">
        <this.props.activeRouteHandler/>
      </div>
    )

module.exports = Layout
