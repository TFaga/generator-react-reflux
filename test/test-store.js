/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('react-reflux:store', function () {
  describe('when using javascript', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../store'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['user'])
      .on('end', done);
    });

    it('creates the store', function () {
      assert.file([
        'app/scripts/stores/UserStore.js',
      ]);
    });

    it('correctly creates variable names', function () {
      assert.fileContent('app/scripts/stores/UserStore.js', /var UserStore /);
    });
  });

  describe('when using coffeescript', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../store'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'coffee-script': true })
      .withArguments(['user'])
      .on('end', done);
    });

    it('creates the coffee store', function () {
      assert.file([
        'app/scripts/stores/UserStore.coffee',
      ]);
    });

    it('correctly creates variable names', function () {
      assert.fileContent('app/scripts/stores/UserStore.coffee', /UserStore /);
    });
  });
});
