var React = require('react');

var Home = React.createClass({

  render: function() {

    return (
      <div className="hero-unit">
        <h1>'Allo, 'Allo!</h1>
        <p>You now have</p>
        <ul>
            <li>ReactJS Reflux Boilerplate</li><% if (includeModernizr) { %>
            <li>Modernizr</li><% } %><% if (includeSass) { %>
            <li>Sass with Compass</li><% } %>
        </ul>
      </div>
    );
  }
});

module.exports = Home;
