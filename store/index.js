var path = require('path');
var yeoman = require('yeoman-generator');

var StoreGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.lodash = require('lodash');
    this.path = path;

    this.option('coffee-script', {
      desc: 'Use CoffeeScript',
      defaults: false
    });

    this.argument('storeName', {
      type: String,
      required: true
    });
  },

  writing: {

    coffeeScript: function () {
      if (this.options['coffee-script']) {
        this.fs.copyTpl(
          this.templatePath('store.cjsx'),
          this.destinationPath('app/scripts/stores/' + this.storeName + '.cjsx'),
          this
        );
      }
    },

    javaScript: function () {
      if (!this.options['coffee-script']) {
        this.fs.copyTpl(
          this.templatePath('store.jsx'),
          this.destinationPath('app/scripts/stores/' + this.storeName + '.jsx'),
          this
        );
      }
    }
  }
});

module.exports = StoreGenerator;
