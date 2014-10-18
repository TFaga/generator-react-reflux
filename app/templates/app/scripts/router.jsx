var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;

var Layout = require('./components/layout');
var Home = require('./components/home');

var routes = (
  <Routes>
    <Route name="layout" path="/" handler={Layout}>
       <DefaultRoute handler={Home}/>
    </Route>
  </Routes>
);

exports.start = function() {
  React.renderComponent(routes, document.getElementById('content'));
}
