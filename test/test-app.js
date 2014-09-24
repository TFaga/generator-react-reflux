/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('react-reflux:app', function () {
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
          'includeModernizr',
          'includeSass'
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
      'app/scripts/app.js',
      'app/scripts/router.jsx',
      'app/scripts/components/layout.jsx',
      'app/scripts/components/home.jsx',
      'app/styles/main.scss',
      'app/index.html',

      'gulpfile.js',
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc',
      'README.md'
    ]);
  });
});