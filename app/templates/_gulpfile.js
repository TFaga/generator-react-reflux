var gulp        = require('gulp');

var $           = require('gulp-load-plugins')();
var del         = require('del');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var runSequence = require('run-sequence');

var env = 'dev';

gulp.task('clean:dev', function() {
  return del(['.tmp']);
});

gulp.task('clean:dist', function() {
  return del(['dist']);
});

gulp.task('scripts', function() {
  var bundler = browserify('./app/scripts/app.js', {
    extensions: ['.jsx'],
    debug: env == 'dev'
  }).transform('reactify');

  return bundler.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('.tmp/scripts'));
});
<% if (includeSass) { %>
gulp.task('compass', function() {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.compass({
      css: '.tmp/styles',
      sass: 'app/styles'
    }));
});<% } %>

gulp.task('imagemin', function() {
  return gulp.src('app/images/*')
    .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('copy', function() {
  return gulp.src(['app/*.txt', 'app/*.ico'])
    .pipe(gulp.dest('dist'));
})

gulp.task('bundle', function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});
  var jsFilter = $.filter(['**/*.js']);
  var cssFilter = $.filter(['**/*.css']);
  var htmlFilter = $.filter(['*.html']);

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(jsFilter)
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe($.minifyCss())
    .pipe(cssFilter.restore())
    .pipe(htmlFilter)
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(htmlFilter.restore())
    .pipe($.revAll({ ignore: [/^\/favicon.ico$/g, '.html'] }))
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('webserver', function() {
  return gulp.src(['.tmp', 'app'])
    .pipe($.webserver({
      host: '0.0.0.0', //change to 'localhost' to disable outside connections
      livereload: true,
      open: true
    }));
});

gulp.task('serve', function() {
  runSequence('clean:dev', ['scripts'<% if (includeSass) { %>, 'compass'<% } %>], 'webserver');

  gulp.watch('app/*.html');

  gulp.watch('app/scripts/**/*.js', ['scripts']);

  gulp.watch('app/scripts/**/*.jsx', ['scripts']);
  <% if (includeSass) { %>
  gulp.watch('app/styles/**/*.scss', ['compass']);<% } %>
});

gulp.task('build', function() {
  env = 'prod';

  runSequence(['clean:dev', 'clean:dist'],
              ['scripts',<% if (includeSass) { %> 'compass',<% } %> 'imagemin', 'copy'],
              'bundle');
});
