jest.dontMock '../app/scripts/components/home.cjsx'

describe 'HomePage', ->
  it 'shows text', ->
    React = require 'react/addons'
    Home = require '../app/scripts/components/home.cjsx'
    TestUtils = React.addons.TestUtils

    # Render the home component
    home = TestUtils.renderIntoDocument <Home />

    # Verify that the title is there
    title = TestUtils.findRenderedDOMComponentWithTag home, 'h1'
    expect(title.getDOMNode().textContent).toEqual '\'Allo, \'Allo!'