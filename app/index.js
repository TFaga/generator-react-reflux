'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var ReactRefluxGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the excellent React Reflux generator!'
    ));

    this.log(chalk.magenta('Out of the box I include ReactJS, React-Router, ReFlux, jQuery.'));

    var prompts = [{
      name: 'projectName',
      message: 'What is the project\'s name?',
      default: path.basename(path.resolve('.'))
    },
    {
      name: 'desc',
      message: 'Enter a brief project description?'
    },
    {
      name: 'author',
      message: 'Who is the author?',
      default: 'Jane Doe'
    },
    {
      name: 'version',
      message: 'What is the project\'s inital version?',
      default: '0.0.0'
    },
    {
      name: 'license',
      message: 'What is the project\'s license?',
      default: 'MIT'
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [
      {
          name: 'Modernizr',
          value: 'includeModernizr',
          checked: true
      },{
          name: 'Sass with Compass',
          value: 'includeSass',
          checked: true
      }]
    }];

    this.prompt(prompts, function (props) {
      var features = props.features;

      function hasFeature(feat) { return features.indexOf(feat) !== -1; }

      this.projectName = props.projectName;
      this.desc = props.desc;
      this.author = props.author;
      this.version = props.version;
      this.license = props.license;

      this.includeModernizr = hasFeature('includeModernizr');
      this.includeSass = hasFeature('includeSass');

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('app');
      this.dest.mkdir('app/images');
      this.dest.mkdir('app/scripts');
      this.dest.mkdir('app/scripts/actions');
      this.dest.mkdir('app/scripts/components');
      this.dest.mkdir('app/scripts/stores');
      this.dest.mkdir('app/styles');

      this.src.copy('app/favicon.ico', 'app/favicon.ico');
      this.src.copy('app/robots.txt', 'app/robots.txt');
      this.src.copy('app/404.html', 'app/404.html');
      this.src.copy('app/scripts/app.js', 'app/scripts/app.js');
      this.src.copy('app/scripts/router.jsx', 'app/scripts/router.jsx');
      this.src.copy('app/scripts/components/layout.jsx', 'app/scripts/components/layout.jsx');

      this.template('app/index.html', 'app/index.html');
      this.template('app/scripts/components/home.jsx', 'app/scripts/components/home.jsx');
      this.template('_gulpfile.js', 'gulpfile.js');
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('README.md', 'README.md');

      this.src.copy('app/styles/main.scss', 'app/styles/main.' + (this.includeSass ? 'scss' : 'css'));
    },

    projectfiles: function () {
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('bowerrc', '.bowerrc');
    }
  },

  end: function () {
    this.log(chalk.magenta('\nMake sure to run \'npm install\' and \'bower install\' before starting to install dependencies.'));
  }
});

module.exports = ReactRefluxGenerator;
