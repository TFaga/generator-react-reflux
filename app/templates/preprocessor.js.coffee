var CoffeeReact = require('coffee-react');
var CoffeeScript = require('coffee-script');

module.exports = {
  process: function(src, path) {

  	if (CoffeeScript.helpers.isCoffee(path)) {
      return CoffeeReact.compile(src, {
        'bare': true,
        'literate': CoffeeScript.helpers.isLiterate(path)
      });
    }

    return src;
  }
};