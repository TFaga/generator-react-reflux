var path = require('path');
var yeoman = require('yeoman-generator');


var ComponentGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.lodash = require('lodash');
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
        this.fs.copyTpl(
          this.templatePath('component.cjsx'),
          this.destinationPath('app/scripts/components/' + this.componentName + '.cjsx'),
          this
        );
      }
    },

    javaScript: function () {
      if (!this.options['coffee-script']) {
        this.fs.copyTpl(
          this.templatePath('component.jsx'),
          this.destinationPath('app/scripts/components/' + this.componentName + '.jsx'),
          this
        );
      }
    }
  }
});

module.exports = ComponentGenerator;
