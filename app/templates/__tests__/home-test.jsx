jest.dontMock('../app/scripts/components/home.jsx');

describe('HomePage', function() {
  it('shows text', function() {
    var React = require('react/addons');
    var Home = require('../app/scripts/components/home.jsx');
    var TestUtils = React.addons.TestUtils;

    // Render the home component
    var home = TestUtils.renderIntoDocument(
      <Home />
    );

    // Verify that the title is there
    var title = TestUtils.findRenderedDOMComponentWithTag(home, 'h1');
    expect(title.getDOMNode().textContent).toEqual('\'Allo, \'Allo!');
  });
});