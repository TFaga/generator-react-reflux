var React = require('react');

var Layout = React.createClass({

  render: function() {

    return (
      <div className="App">
        <this.props.activeRouteHandler/>
      </div>
    );
  }
});

module.exports = Layout;
