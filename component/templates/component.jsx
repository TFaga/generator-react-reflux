var React = require('react');

var <%= lodash.capitalize(path.basename(componentName)) %> = React.createClass({

  render: function() {

    return (
      <div>
        <p>Your content</p>
      </div>
    );
  }
});

module.exports = <%= lodash.capitalize(path.basename(componentName)) %>;
