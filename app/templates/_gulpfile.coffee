gulp          = require 'gulp'

$             = require('gulp-load-plugins')()
del           = require 'del'
source        = require 'vinyl-source-stream'
browserify    = require 'browserify'
preprocessify = require 'preprocessify'
runSequence   = require 'run-sequence'
domain        = require 'domain'

env           = 'dev'
webserver     = false

log = (task, start) ->
  if not start then setTimeout ->
    $.util.log 'Starting', '\'' + $.util.colors.cyan(task) + '\'...'
  , 1
  else
    time = ((new Date() - start) / 1000).toFixed(2) + ' s'
    $.util.log 'Finished', '\'' + $.util.colors.cyan(task) + '\'', 'after', $.util.colors.magenta(time)

gulp.task 'clean:dev', ->
  del ['.tmp']

gulp.task 'clean:dist', ->
  del ['dist']

gulp.task 'scripts', ->
  dev = env is 'dev'
  filePath = './app/scripts/app.coffee'
  extensions = ['.cjsx', '.coffee']

  bundle = ->
    if dev
      start = new Date()
      log 'scripts:bundle'
    browserify
      entries: [filePath]
      extensions: extensions
      debug: env is 'dev'
    .transform preprocessify { env: env },
      includeExtensions: extensions
    .transform 'coffee-reactify'
    .bundle()
      .pipe source 'app.js'
      .pipe gulp.dest '.tmp/scripts/bundle'
      .pipe $.if dev, $.tap ->
        log 'scripts:bundle', start
        if not webserver then runSequence 'webserver'

  if dev
    gulp.src filePath
      .pipe $.plumber()
      .pipe $.tap (file) ->
        d = domain.create()
        d.on 'error', (err) ->
          $.util.log $.util.colors.red('Browserify compile error:'), err.message, '\n\t', $.util.colors.cyan('in file'), file.path
          $.util.beep()
        d.run bundle
  else bundle()
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
  assets = $.useref.assets()
  revAll = new $.revAll dontRenameFile: [/^\/favicon.ico$/g, '.html']
  jsFilter = $.filter ['**/*.js']
  cssFilter = $.filter ['**/*.css']
  htmlFilter = $.filter ['*.html']

  return gulp.src 'app/index.html'
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
    .pipe revAll.revision()
    .pipe gulp.dest 'dist'
    .pipe $.size()

gulp.task 'webserver', ->
  webserver = gulp.src ['.tmp', 'app']
    .pipe $.webserver
      host: '0.0.0.0' #change to 'localhost' to disable outside connections
      livereload:
        enable: true
        filter: (filePath) ->
          if /app\\(?=scripts<% if (includeSass) { %>|styles<% } %>)/.test filePath
            $.util.log 'Ignoring', $.util.colors.magenta filePath
            return false
          else return true
      open: true

gulp.task 'serve', ->
  runSequence 'clean:dev', ['scripts'<% if (includeSass) { %>, 'compass'<% } %>]
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

gulp.task 'default', ['build']
