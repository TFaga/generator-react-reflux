'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var buildTools = ['gulp', 'grunt'];

var ReactRefluxGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    this.option('modernizr', {
      desc: 'Use Modernizr',
      defaults: false
    });

    this.option('coffee-script', {
      desc: 'Use CoffeeScript',
      defaults: false
    });

    this.option('compass', {
      desc: 'Use Sass with Compass',
      defaults: false
    });

    this.option('jest', {
      desc: 'Use jest tests',
      defaults: false
    });

    this.option('build-tool', {
      desc: 'Select the build tool',
      type: String,
      defaults: 'gulp'
    });

    this.option('skip-install', {
      desc: 'Skip the bower and node installations',
      defaults: false
    });

    this.argument('appName', {
      type: String,
      required: false
    });
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
      default: this.appName || path.basename(path.resolve('.'))
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
        checked: this.options.modernizr || false
      }, {
        name: 'CoffeeScript',
        value: 'includeCoffee',
        checked: this.options.coffee || false
      }, {
        name: 'Sass with Compass',
        value: 'includeSass',
        checked: this.options.compass || false
      }, {
        name: 'Jest tests',
        value: 'includeJest',
        checked: this.options.jest || false
      }]
    },
    {
      type: 'list',
      name: 'buildTool',
      message: 'Which build tool would you like?',
      choices: [
      {
        name: 'Gulp',
        value: 'gulp'
      },
      {
        name: 'Grunt',
        value: 'grunt'
      }],
      default: buildTools.indexOf(this.options['build-tool']) > -1 ? this.options['build-tool'] : 'gulp'
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
      this.includeCoffee = hasFeature('includeCoffee');
      this.includeSass = hasFeature('includeSass');
      this.includeJest = hasFeature('includeJest');

      this.buildTool = props.buildTool;

      done();
    }.bind(this));
  },

  writing: {

    directories: function () {
      this.dest.mkdir('app');
      this.dest.mkdir('app/images');
      this.dest.mkdir('app/scripts');
      this.dest.mkdir('app/scripts/actions');
      this.dest.mkdir('app/scripts/components');
      this.dest.mkdir('app/scripts/stores');
      this.dest.mkdir('app/styles');
    },

    commonFiles: function () {
      this.src.copy('app/favicon.ico', 'app/favicon.ico');
      this.src.copy('app/robots.txt', 'app/robots.txt');
      this.src.copy('app/404.html', 'app/404.html');

      this.template('app/index.html', 'app/index.html');
      this.template('_bower.json', 'bower.json');
      this.template('_README.md', 'README.md');

      if (this.buildTool === 'gulp') {
        this.template('_package-gulp.json', 'package.json');
      } else if (this.buildTool === 'grunt') {
        this.template('_package-grunt.json', 'package.json');
      }
    },

    coffeeScript: function () {
      if (this.includeCoffee) {
        this.src.copy('app/scripts/app.coffee', 'app/scripts/app.coffee');
        this.src.copy('app/scripts/router.cjsx', 'app/scripts/router.cjsx');
        this.src.copy('app/scripts/components/layout.cjsx', 'app/scripts/components/layout.cjsx');

        this.template('app/scripts/components/home.cjsx', 'app/scripts/components/home.cjsx');

        if (this.buildTool === 'gulp') {
          this.template('_gulpfile.coffee', 'gulpfile.coffee');
        } else if (this.buildTool === 'grunt') {
          this.template('_Gruntfile.coffee', 'Gruntfile.coffee', {
            yeomanApp: '<%= yeoman.app %>',
            yeomanDist: '<%= yeoman.dist %>',
            includeSass: this.includeSass
          });
        }

        if (this.includeJest) {
          this.src.copy('__tests__/home-test.cjsx', '__tests__/home-test.cjsx');
          this.src.copy('preprocessor.js.coffee', 'preprocessor.js');
        }
      }
    },

    javaScript: function () {
      if (!this.includeCoffee) {
        this.src.copy('app/scripts/app.js', 'app/scripts/app.js');
        this.src.copy('app/scripts/router.jsx', 'app/scripts/router.jsx');
        this.src.copy('app/scripts/components/layout.jsx', 'app/scripts/components/layout.jsx');

        this.template('app/scripts/components/home.jsx', 'app/scripts/components/home.jsx');

        if (this.buildTool === 'gulp') {
          this.template('_gulpfile.js', 'gulpfile.js');
        } else if (this.buildTool === 'grunt') {
          this.template('_Gruntfile.js', 'Gruntfile.js', {
            yeomanApp: '<%= yeoman.app %>',
            yeomanDist: '<%= yeoman.dist %>',
            includeSass: this.includeSass
          });
        }

        if (this.includeJest) {
          this.src.copy('__tests__/home-test.jsx', '__tests__/home-test.jsx');
          this.src.copy('preprocessor.js', 'preprocessor.js');
        }
      }
    },

    styleSheets: function () {
      this.src.copy('app/styles/main.' + (this.includeSass ? 'scss' : 'css'),
        'app/styles/main.' + (this.includeSass ? 'scss' : 'css'));
    },

    projectfiles: function () {
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('bowerrc', '.bowerrc');
    }
  },

  end: function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  }
});

module.exports = ReactRefluxGenerator;
