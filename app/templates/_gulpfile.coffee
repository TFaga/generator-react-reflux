gulp          = require 'gulp'

$             = require('gulp-load-plugins')()
del           = require 'del'
source        = require 'vinyl-source-stream'
browserify    = require 'browserify'
preprocessify = require 'preprocessify'
runSequence   = require 'run-sequence'
domain        = require 'domain'

env           = 'dev'

gulp.task 'clean:dev', ->
  del ['.tmp']

gulp.task 'clean:dist', ->
  del ['dist']

gulp.task 'scripts', ->
  filePath = './app/scripts/app.coffee'
  extensions = ['.cjsx', '.coffee']
  debug = env is 'dev'

  bundle = ->
    browserify
      entries: [filePath]
      extensions: extensions
      debug: debug
    .transform preprocessify { env: env, debug: debug },
      includeExtensions: extensions
    .transform 'coffee-reactify'
    .bundle()
      .pipe source 'app.js'
      .pipe gulp.dest '.tmp/scripts'

  if env is 'dev'
    return gulp.src filePath
      .pipe $.plumber()
      .pipe $.tap (file) ->
        d = domain.create()
        d.on 'error', (err) ->
          $.util.log $.util.colors.red('Browserify compile error:'), err.message, '\n\t', $.util.colors.cyan('in file'), file.path
          $.util.beep()
        d.run bundle
  else return bundle()
<% if (includeSass) { %>
gulp.task 'compass', ->
  dev = env is 'dev'
  return gulp.src 'app/styles/**/*.scss'
    .pipe $.plumber()
    .pipe $.if dev, $.cached 'compass'
    .pipe $.compass
      css: '.tmp/styles'
      sass: 'app/styles'<% } %>

gulp.task 'imagemin', ->
  return gulp.src 'app/images/*'
    .pipe $.imagemin
      progressive: true
      svgoPlugins: [ removeViewBox: false ]
    .pipe gulp.dest 'dist/images'

gulp.task 'copy', ->
  return gulp.src ['app/*.txt', 'app/*.ico']
    .pipe gulp.dest 'dist'

gulp.task 'bundle', ->
  assets = $.useref.assets searchPath: '{.tmp,app}'
  jsFilter = $.filter ['**/*.js']
  cssFilter = $.filter ['**/*.css']
  htmlFilter = $.filter ['*.html']

  return gulp.src 'app/*.html'
    .pipe $.preprocess()
    .pipe assets
    .pipe assets.restore()
    .pipe $.useref()
    .pipe jsFilter
    .pipe $.uglify()
    .pipe jsFilter.restore()
    .pipe cssFilter
    .pipe $.autoprefixer
      browsers: ['last 5 versions']
    .pipe $.minifyCss()
    .pipe cssFilter.restore()
    .pipe htmlFilter
    .pipe $.htmlmin collapseWhitespace: true
    .pipe htmlFilter.restore()
    .pipe $.revAll ignore: [/^\/favicon.ico$/g, '.html']
    .pipe $.revReplace()
    .pipe gulp.dest 'dist'
    .pipe $.size()

gulp.task 'webserver', ->
  return gulp.src ['.tmp', 'app']
    .pipe $.webserver
      host: '0.0.0.0' #change to 'localhost' to disable outside connections
      port: 8080
      livereload: true
      open: true

gulp.task 'serve', ->
  runSequence 'clean:dev', ['scripts'<% if (includeSass) { %>, 'compass'<% } %>], 'webserver'
  gulp.watch 'app/*.html'
  gulp.watch 'app/scripts/**/*.coffee', ['scripts']
  gulp.watch 'app/scripts/**/*.cjsx', ['scripts']<% if (includeSass) { %>
  compass = gulp.watch 'app/styles/**/*.scss', ['compass']
  compass.on 'change', (event) ->
    if event.type is 'deleted'
      delete $.cached.caches['compass'][event.path]<% } %>

gulp.task 'build', ->
  env = 'prod'
  runSequence ['clean:dev', 'clean:dist'],
              ['scripts',<% if (includeSass) { %> 'compass',<% } %> 'imagemin'],
              ['bundle', 'copy']
