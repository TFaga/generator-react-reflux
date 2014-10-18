gulp        = require 'gulp'

$           = require('gulp-load-plugins')()
del         = require 'del'
source      = require 'vinyl-source-stream'
browserify  = require 'browserify'
runSequence = require 'run-sequence'

env         = 'dev'

gulp.task 'clean:dev', ->
  del ['.tmp']

gulp.task 'clean:dist', ->
  del ['dist']

gulp.task 'scripts', ->
  bundler = browserify './app/scripts/app.coffee',
    extensions: ['.cjsx', '.coffee']
    debug: env == 'dev'
  .transform 'coffee-reactify' 

  bundler.bundle()
    .pipe source('app.js')
    .pipe gulp.dest('.tmp/scripts')
<% if (includeSass) { %>
gulp.task 'compass', ->
  gulp.src 'app/styles/**/*.scss'
    .pipe $.plumber()
    .pipe $.compass
      css: '.tmp/styles'
      sass: 'app/styles'<% } %>

gulp.task 'imagemin', ->
  gulp.src 'app/images/*'
    .pipe $.imagemin
            progressive: true
            svgoPlugins: [ removeViewBox: false ]
    .pipe gulp.dest('dist/images')

gulp.task 'copy', ->
  gulp.src ['app/*.txt', 'app/*.ico']
    .pipe gulp.dest('dist')

gulp.task 'bundle', ->
  assets = $.useref.assets searchPath: '{.tmp,app}'
  jsFilter = $.filter ['**/*.js']
  cssFilter = $.filter ['**/*.css']
  htmlFilter = $.filter ['*.html']

  gulp.src 'app/*.html'
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
    .pipe $.htmlmin(collapseWhitespace: true)
    .pipe htmlFilter.restore()
    .pipe $.revAll( ignore: [/^\/favicon.ico$/g, '.html'] )
    .pipe $.revReplace()
    .pipe gulp.dest('dist')
    .pipe $.size()

gulp.task 'webserver', ->
  gulp.src ['.tmp', 'app']
    .pipe $.webserver
      livereload: true
      open: true

gulp.task 'serve', ->
  runSequence 'clean:dev', ['scripts'<% if (includeSass) { %>, 'compass'<% } %>], 'webserver'

  gulp.watch 'app/*.html'

  gulp.watch 'app/scripts/**/*.coffee', ['scripts']

  gulp.watch 'app/scripts/**/*.cjsx', ['scripts']
  <% if (includeSass) { %>
  gulp.watch 'app/styles/**/*.scss', ['compass']<% } %>

gulp.task 'build', ->
  env = 'prod'

  runSequence ['clean:dev', 'clean:dist'],
              ['scripts',<% if (includeSass) { %> 'compass',<% } %> 'imagemin', 'copy'],
              'bundle'
