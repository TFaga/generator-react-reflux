# Reactjs Reflux generator [![Build Status](https://travis-ci.org/TFaga/generator-react-reflux.svg?branch=master)](https://travis-ci.org/TFaga/generator-react-reflux)

> A Yeoman Generator for facebook's React framework and flux architecture using reflux.


## What's inside?

* gulp
* bower
* browserify
* reactify
* coffeescript
* compass
* jest
* reactjs
* reflux
* react-router

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

Run `gulp` for building and `gulp serve` for preview

## Generators

Available generators:

* [react-reflux](#app) (aka [react-reflux:app](#app))

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

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

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
