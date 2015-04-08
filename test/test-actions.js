/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('react-reflux:actions', function () {
  describe('when using javascript', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../actions'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['user'])
      .on('end', done);
    });

    it('creates the actions', function () {
      assert.file([
        'app/scripts/actions/UserActions.js',
      ]);
    });

    it('correctly creates variable names', function () {
      assert.fileContent('app/scripts/actions/UserActions.js', /var UserActions /);
    });
  });

  describe('when using coffeescript', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../actions'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'coffee-script': true })
      .withArguments(['user'])
      .on('end', done);
    });

    it('creates the coffee actions', function () {
      assert.file([
        'app/scripts/actions/UserActions.coffee',
      ]);
    });

    it('correctly creates variable names', function () {
      assert.fileContent('app/scripts/actions/UserActions.coffee', /UserActions /);
    });
  });
});
