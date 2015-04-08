# Reactjs Reflux generator
[![Build Status](http://img.shields.io/travis/TFaga/generator-react-reflux/master.svg?style=flat)](https://travis-ci.org/TFaga/generator-react-reflux) [![npm](http://img.shields.io/npm/v/generator-react-reflux.svg?style=flat)](https://www.npmjs.com/package/generator-react-reflux)

> A Yeoman Generator for facebook's React framework and flux architecture using reflux.


## What's inside?

* gulp
* grunt
* bower
* browserify
* reactify
* coffeescript
* compass
* jest
* reactjs
* reflux
* react-router
* bootstrap (Twitter Bootstrap's official Sass version)
* preprocessify (for environments management)

## Usage

Install `generator-react-reflux`:
```
npm install -g generator-react-reflux
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo react-reflux`, optionally passing an app name:
```
yo react-reflux [app-name]
```

If selected install `compass`
```
gem install compass
```

If you chose gulp then run `gulp` for building and `gulp serve` for preview. However if you chose grunt then run `grunt` for building and `grunt server` for preview.

## Generators

Available generators:

* [react-reflux](#app) (aka [react-reflux:app](#app))
* [react-reflux:component](#component)
* [react-reflux:store](#store)
* [react-reflux:actions](#actions)

**Note: Generators are to be run from the root directory of your app.**

### App

Sets up a new ReactJS app using the flux architecture implemented by reflux, generating all the boilerplate you need to get started.

Example:
```bash
yo react-reflux
```

Options:

* `--modernizr`
	
	Include Modernizr.

* `--coffee-script`
	
	Generate scripts in CoffeeScript.

* `--compass`
	
	Generate stylesheets in Compass.

* `--jest`
	
	Generate testing boilerplate with jest.

* `--build-tool=[grunt|gulp]`
  
  Generate build config in the selected tool. Defaults to gulp.

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

### Component

Generates a ReactJS component in `app/scripts/components`.

Example:
```bash
yo react-reflux:component dashboard
```

Options:

* `--coffee-script`
  
  Generate the component in CoffeeScript.

### Store

Generates a RefluxJS store in `app/scripts/stores`.

Example:
```bash
yo react-reflux:store user
```

Options:

* `--coffee-script`
  
  Generate the store in CoffeeScript.

### Actions

Generates RefluxJS actions in `app/scripts/actions`.

Example:
```bash
yo react-reflux:actions user
```

Options:

* `--coffee-script`
  
  Generate the actions in CoffeeScript.

## Testing

Running `npm test` will run the unit tests with mocha.

## Changelog

Recent changes can be viewed on Github on the [Releases Page](https://github.com/tfaga/generator-react-reflux/releases)

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

## License

MIT
