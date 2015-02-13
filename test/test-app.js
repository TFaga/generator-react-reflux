/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('react-reflux:app', function () {
  describe('when using no features with gulp', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
        ]
      })
      .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'app/images',
        'app/scripts/actions',
        'app/scripts/stores',

        'app/favicon.ico',
        'app/robots.txt',
        'app/404.html',
        'app/scripts/app.js',
        'app/scripts/router.jsx',
        'app/scripts/components/layout.jsx',
        'app/scripts/components/home.jsx',
        'app/styles/main.css',
        'app/index.html',

        'gulpfile.js',
        'bower.json',
        'package.json',
        '.editorconfig',
        '.jshintrc',
        'README.md'
      ]);
    });

    it('doesn\'t create grunt config', function () {
      assert.noFile([
        'Gruntfile.js'
      ]);
    });

    it('writes metadata to package.json', function () {
      assert.fileContent('package.json', /test/);
      assert.fileContent('package.json', /A test project/);
      assert.fileContent('package.json', /Test Testington/);
      assert.fileContent('package.json', /1.0.1/);
      assert.fileContent('package.json', /MIT/);
    });

    it('writes metadata to bower.json', function () {
      assert.fileContent('bower.json', /test/);
      assert.fileContent('bower.json', /Test Testington/);
      assert.fileContent('bower.json', /1.0.1/);
      assert.fileContent('bower.json', /MIT/);
    });

    it('writes metadata to index.html', function () {
      assert.fileContent('app/index.html', /A test project/);
    });

    it('uses css syntax', function () {
      assert.fileContent('app/styles/main.css', /.hero-unit h1/);
    });
  });

  describe('when using no features with grunt', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
        ],
        buildTool: 'grunt'
      })
      .on('end', done);
    });

    it('creates grunt config', function () {
      assert.file([
        'Gruntfile.js'
      ]);
    });

    it('doesn\'t create gulp config', function () {
      assert.noFile([
        'gulpfile.js'
      ]);
    });
  });

  describe('when using modernizr', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
          'includeModernizr'
        ]
      })
      .on('end', done);
    });

    it('inserts modernizr to html', function () {
      assert.fileContent('app/index.html', /<script src="vendor\/modernizr\/modernizr.js"><\/script>/);
    });

    it('inserts modernizr to bower', function () {
      assert.fileContent('bower.json', /"modernizr"/);
    });

    it('inserts modernizr to home html component', function () {
      assert.fileContent('app/scripts/components/home.jsx', /<li>Modernizr<\/li>/);
    });
  });

  describe('when using CoffeeScript with gulp', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
          'includeCoffee'
        ]
      })
      .on('end', done);
    });

    it('creates coffee and cjsx files', function () {
      assert.file([
        'app/scripts/app.coffee',
        'app/scripts/router.cjsx',
        'app/scripts/components/layout.cjsx',
        'app/scripts/components/home.cjsx',

        'gulpfile.coffee'
      ]);
    });

    it('doesn\'t create js and jsx files', function () {
      assert.noFile([
        'app/scripts/app.js',
        'app/scripts/router.jsx',
        'app/scripts/components/layout.jsx',
        'app/scripts/components/home.jsx',

        'gulpfile.js',
        'Gruntfile.coffee',
        'Gruntfile.js'
      ]);
    });

    it('inserts coffeescript requirements to package.json', function () {
      assert.fileContent([
        ['package.json', /"coffee-reactify"/],
        ['package.json', /"coffee-script"/],
        ['package.json', /"gulp-rename"/]
      ]);
    });

    it('doesn\'t insert unneeded requirements to package.json', function () {
      assert.noFileContent('package.json', /"reactify"/);
    });
  });

  describe('when using CoffeeScript with grunt', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
          'includeCoffee'
        ],
        buildTool: 'grunt'
      })
      .on('end', done);
    });

    it('creates coffee grunt config', function () {
      assert.file([
        'Gruntfile.coffee'
      ]);
    });

    it('doesn\'t create js or coffee gulp config', function () {
      assert.noFile([
        'gulpfile.js',
        'gulpfile.coffee',
        'Gruntfile.js'
      ]);
    });
  });

  describe('when using compass with gulp', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
          'includeSass'
        ]
      })
      .on('end', done);
    });

    it('creates sass files', function () {
      assert.file([
        'app/styles/main.scss'
      ]);
    });

    it('doesn\'t create css files', function () {
      assert.noFile([
        'app/styles/main.css'
      ]);
    });

    it('inserts compass to gulp', function () {
      assert.fileContent('gulpfile.js', /'compass'/);
    });

    it('inserts compass to package.json', function () {
      assert.fileContent('package.json', /"gulp-compass"/);
    });

    it('inserts compass to home html component', function () {
      assert.fileContent('app/scripts/components/home.jsx', /<li>Sass with Compass<\/li>/);
    });
  });

  describe('when using compass with grunt', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
          'includeSass'
        ],
        buildTool: 'grunt'
      })
      .on('end', done);
    });

    it('inserts compass to grunt', function () {
      assert.fileContent('Gruntfile.js', /compass:/);
    });

    it('inserts compass to package.json', function () {
      assert.fileContent('package.json', /"grunt-contrib-compass"/);
    });
  });

  describe('when using jest with javascript', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
          'includeJest'
        ]
      })
      .on('end', done);
    });

    it('creates test file', function () {
      assert.file([
        '__tests__/home-test.jsx'
      ]);
    });

    it('creates test preprocessor', function () {
      assert.file([
        'preprocessor.js'
      ]);
    });

    it('contains javascript preprocessor', function () {
      assert.fileContent('preprocessor.js', /ReactTools.transform\(src\)/)
    });

    it('inserts jest to package.json', function () {
      assert.fileContent('package.json', /"jest-cli"/);
    });

    it('inserts react-tools to package.json', function () {
      assert.fileContent('package.json', /"react-tools"/);
    });

    it('inserts test script to package.json', function () {
      assert.fileContent('package.json', /"test": ".\/node_modules\/jest-cli\/bin\/jest.js"/);
    });

    it('inserts jest config to package.json', function () {
      assert.fileContent('package.json', /"jest": {/);
    });
  });

  describe('when using jest with coffeescript', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        projectName: 'test',
        desc: 'A test project',
        author: 'Test Testington',
        version: '1.0.1',
        license: 'MIT',
        features: [
          'includeCoffee',
          'includeJest'
        ]
      })
      .on('end', done);
    });

    it('creates test file', function () {
      assert.file([
        '__tests__/home-test.cjsx'
      ]);
    });

    it('creates test preprocessor', function () {
      assert.file([
        'preprocessor.js'
      ]);
    });

    it('contains javascript preprocessor', function () {
      assert.fileContent('preprocessor.js', /CoffeeReact.compile\(src, {/)
    });

    it('inserts jest to package.json', function () {
      assert.fileContent('package.json', /"jest-cli"/);
    });

    it('inserts coffee-react to package.json', function () {
      assert.fileContent('package.json', /"coffee-react"/);
    });

    it('inserts test script to package.json', function () {
      assert.fileContent('package.json', /"test": ".\/node_modules\/jest-cli\/bin\/jest.js"/);
    });

    it('inserts jest config to package.json', function () {
      assert.fileContent('package.json', /"jest": {/);
    });
  });
});
