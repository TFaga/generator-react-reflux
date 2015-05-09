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

    commonFiles: function () {
      this.fs.copy(
        this.templatePath('app/favicon.ico'),
        this.destinationPath('app/favicon.ico')
      );
      this.fs.copy(
        this.templatePath('app/robots.txt'),
        this.destinationPath('app/robots.txt')
      );
      this.fs.copy(
        this.templatePath('app/404.html'),
        this.destinationPath('app/404.html')
      );

      this.fs.copyTpl(
        this.templatePath('app/index.html'),
        this.destinationPath('app/index.html'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        this
      );

      if (this.buildTool === 'gulp') {
        this.fs.copyTpl(
          this.templatePath('_package-gulp.json'),
          this.destinationPath('package.json'),
          this
        );
      } else if (this.buildTool === 'grunt') {
        this.fs.copyTpl(
          this.templatePath('_package-grunt.json'),
          this.destinationPath('package.json'),
          this
        );
      }
    },

    coffeeScript: function () {
      if (this.includeCoffee) {
        this.fs.copy(
          this.templatePath('app/scripts/app.coffee'),
          this.destinationPath('app/scripts/app.coffee')
        );
        this.fs.copy(
          this.templatePath('app/scripts/router.cjsx'),
          this.destinationPath('app/scripts/router.cjsx')
        );
        this.fs.copy(
          this.templatePath('app/scripts/components/layout.cjsx'),
          this.destinationPath('app/scripts/components/layout.cjsx')
        );

        this.fs.copyTpl(
          this.templatePath('app/scripts/components/home.cjsx'),
          this.destinationPath('app/scripts/components/home.cjsx'),
          this
        );

        if (this.buildTool === 'gulp') {
          this.fs.copyTpl(
            this.templatePath('_gulpfile.coffee'),
            this.destinationPath('gulpfile.coffee'),
            this
          );
        } else if (this.buildTool === 'grunt') {
          this.fs.copyTpl(
            this.templatePath('_Gruntfile.coffee'),
            this.destinationPath('Gruntfile.coffee'),
            {
              yeomanApp: '<%= yeoman.app %>',
              yeomanDist: '<%= yeoman.dist %>',
              includeSass: this.includeSass
            }
          );
        }

        if (this.includeJest) {
          this.fs.copy(
            this.templatePath('__tests__/home-test.cjsx'),
            this.destinationPath('__tests__/home-test.cjsx')
          );
          this.fs.copy(
            this.templatePath('preprocessor.js.coffee'),
            this.destinationPath('preprocessor.js')
          );
        }
      }
    },

    javaScript: function () {
      if (!this.includeCoffee) {
        this.fs.copy(
          this.templatePath('app/scripts/app.js'),
          this.destinationPath('app/scripts/app.js')
        );
        this.fs.copy(
          this.templatePath('app/scripts/router.jsx'),
          this.destinationPath('app/scripts/router.jsx')
        );
        this.fs.copy(
          this.templatePath('app/scripts/components/layout.jsx'),
          this.destinationPath('app/scripts/components/layout.jsx')
        );

        this.fs.copyTpl(
          this.templatePath('app/scripts/components/home.jsx'),
          this.destinationPath('app/scripts/components/home.jsx'),
          this
        );

        if (this.buildTool === 'gulp') {
          this.fs.copyTpl(
            this.templatePath('_gulpfile.js'),
            this.destinationPath('gulpfile.js'),
            this
          );
        } else if (this.buildTool === 'grunt') {
          this.fs.copyTpl(
            this.templatePath('_Gruntfile.js'),
            this.destinationPath('Gruntfile.js'),
            {
              yeomanApp: '<%= yeoman.app %>',
              yeomanDist: '<%= yeoman.dist %>',
              includeSass: this.includeSass
            }
          );
        }

        if (this.includeJest) {
          this.fs.copy(
            this.templatePath('__tests__/home-test.jsx'),
            this.destinationPath('__tests__/home-test.jsx')
          );
          this.fs.copy(
            this.templatePath('preprocessor.js'),
            this.destinationPath('preprocessor.js')
          );
        }
      }
    },

    styleSheets: function () {
      this.fs.copy(
        this.templatePath('app/styles/main.' + (this.includeSass ? 'scss' : 'css')),
        this.destinationPath('app/styles/main.' + (this.includeSass ? 'scss' : 'css'))
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
    }
  },

  end: function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  }
});

module.exports = ReactRefluxGenerator;
