React = require 'react'
Router = require 'react-router'
Route = Router.Route
Routes = Router.Routes
DefaultRoute = Router.DefaultRoute

Layout = require './components/layout'
Home = require './components/home'

routes = (
  <Routes>
    <Route name="layout" path="/" handler={Layout}>
       <DefaultRoute handler={Home}/>
    </Route>
  </Routes>
)

exports.start = ->
  React.renderComponent routes, document.getElementById('content')
