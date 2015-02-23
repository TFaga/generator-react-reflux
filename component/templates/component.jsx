var React = require('react');

var <%= _.camelize('_' + path.basename(componentName)) %> = React.createClass({

  render: function() {

    return (
      <div>
        <p>Your content</p>
      </div>
    );
  }
});

module.exports = <%= _.camelize('_' + path.basename(componentName)) %>;
