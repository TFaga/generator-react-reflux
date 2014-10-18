<a name="1.1.1"></a>
## 1.1.1 - Sat, 19 Oct 2014

#### Bug Fixes

- Changed the gulp imagemin version to 1.0.1 as 1.1.0 does not install dependencies correctly and as such failes to build ([c0d933c](https://github.com/TFaga/generator-react-reflux/commit/c0d933c93b36aff4e857e4b2e2410dda9f6e9500))
- Removed the gulp browserify plugin as it is blacklisted and added the standalone browserify plugin and use it together with vinyl-source-stream to integrate it with gulp streams in the build process ([968c47a](https://github.com/TFaga/generator-react-reflux/commit/968c47accf35335a13ff146adbee1af650e2c1bb))

<a name="1.1.0"></a>
## 1.1.0 - Sat, 19 Oct 2014

#### Features

- Added option to use CoffeeScript instead of plain JavaScript ([9f50a36](https://github.com/TFaga/generator-react-reflux/commit/9f50a366def0635e11526a7b74115855c8a24386))
-	Updated gulp and its plugins versions ([16c999e](https://github.com/TFaga/generator-react-reflux/commit/16c999e8c71134401a78d4d46435517b2271d6ac))
- Swapped gulp rimraf (deprecated) for npm del ([9a1a747](https://github.com/TFaga/generator-react-reflux/commit/9a1a7475dea0334a2dd9d7a62121bb3bfb0dba27))
- Added html minification to the gulp build task ([dfe75e8](https://github.com/TFaga/generator-react-reflux/commit/dfe75e8d09a583d64638704e3b0e4b6a7833cec8))
- Added user entered description to index.html ([ed83d05](https://github.com/TFaga/generator-react-reflux/commit/ed83d05c0d9dd003d9370e03bec5f5620c9154b8))

#### Bug Fixes

- Fixed generated stylesheet syntax error when selecting css instead of sass ([fbba569](https://github.com/TFaga/generator-react-reflux/commit/fbba569652c63c30a94601e6962422645b5e869b))
- Removed unused html gulp task ([ea9b013](https://github.com/TFaga/generator-react-reflux/commit/ea9b013c86fa38d8918a6a1bd0e8636ba07dc66e))

<a name="1.0.1"></a>
## 1.0.1 - Sun, 12 Oct 2014

#### Features

- Updated reflux and react-router versions ([f2462b7](https://github.com/TFaga/generator-react-reflux/commit/f2462b7c1295419dc375635a999f46d1991834aa))

<a name="1.0.0"></a>
## 1.0.0 - Sun, 5 Oct 2014

Initial release.
