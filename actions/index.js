var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var ActionsGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.lodash = _;
    this.path = path;

    this.option('coffee-script', {
      desc: 'Use CoffeeScript',
      defaults: false
    });

    this.argument('actionsName', {
      type: String,
      required: true
    });
  },

  writing: {

    coffeeScript: function () {
      if (this.options['coffee-script']) {
        this.fs.copyTpl(
          this.templatePath('actions.coffee'),
          this.destinationPath('app/scripts/actions/' + path.dirname(this.actionsName) + '/' + _.capitalize(path.basename(this.actionsName)) + 'Actions.coffee'),
          this
        );
      }
    },

    javaScript: function () {
      if (!this.options['coffee-script']) {
        this.fs.copyTpl(
          this.templatePath('actions.js'),
          this.destinationPath('app/scripts/actions/' + path.dirname(this.actionsName) + '/' + _.capitalize(path.basename(this.actionsName)) + 'Actions.js'),
          this
        );
      }
    }
  }
});

module.exports = ActionsGenerator;
