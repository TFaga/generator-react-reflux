var path = require('path');
var yeoman = require('yeoman-generator');

var ComponentGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.path = path;

    this.option('coffee-script', {
      desc: 'Use CoffeeScript',
      defaults: false
    });

    this.argument('componentName', {
      type: String,
      required: true
    });
  },

  writing: {

    coffeeScript: function () {
      if (this.options['coffee-script']) {
        this.template('component.cjsx', 'app/scripts/components/' + this.componentName + '.cjsx');
      }
    },

    javaScript: function () {
      if (!this.options['coffee-script']) {
        this.template('component.jsx', 'app/scripts/components/' + this.componentName + '.jsx');
      }
    }
  }
});

module.exports = ComponentGenerator;
