React = require 'react'
Router = require 'react-router'
RouteHandler = Router.RouteHandler

Layout = React.createClass

  render: ->

    return (
      <div className="App">
        <RouteHandler />
      </div>
    )

module.exports = Layout
