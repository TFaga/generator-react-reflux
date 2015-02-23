/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('react-reflux:component', function () {
  describe('when using javascript', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../component'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['dashboard/users'])
      .on('end', done);
    });

    it('creates the component', function () {
      assert.file([
        'app/scripts/components/dashboard/users.jsx',
      ]);
    });

    it('correctly creates variable names', function () {
      assert.fileContent('app/scripts/components/dashboard/users.jsx', /var Users /);
    });
  });

  describe('when using coffeescript', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../component'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'coffee-script': true })
      .withArguments(['dashboard/users'])
      .on('end', done);
    });

    it('creates the coffee component', function () {
      assert.file([
        'app/scripts/components/dashboard/users.cjsx',
      ]);
    });

    it('correctly creates variable names', function () {
      assert.fileContent('app/scripts/components/dashboard/users.cjsx', /Users /);
    });
  });
});
