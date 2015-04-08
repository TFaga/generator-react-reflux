var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var StoreGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.lodash = _;
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
          this.templatePath('store.coffee'),
          this.destinationPath('app/scripts/stores/' + path.dirname(this.storeName) + '/' + _.capitalize(path.basename(this.storeName)) + 'Store.coffee'),
          this
        );
      }
    },

    javaScript: function () {
      if (!this.options['coffee-script']) {
        this.fs.copyTpl(
          this.templatePath('store.js'),
          this.destinationPath('app/scripts/stores/' + path.dirname(this.storeName) + '/' + _.capitalize(path.basename(this.storeName)) + 'Store.js'),
          this
        );
      }
    }
  }
});

module.exports = StoreGenerator;
