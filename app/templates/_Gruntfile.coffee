livereload = require 'connect-livereload'
path = require 'path'

module.exports = (grunt) ->

  # show elapsed time at the end
  require('time-grunt') grunt

  # load all grunt tasks
  require('load-grunt-tasks') grunt

  yeomanConfig =
    app: 'app'
    dist: 'dist'

  grunt.initConfig
    yeoman: yeomanConfig,
    connect:
      options:
        port: 3000
        hostname: '0.0.0.0' # change to 'localhost' to disable outside connections
      livereload:
        options:
          middleware: (connect) ->
            return [
              livereload port: 35729
              connect.static path.resolve('.tmp')
              connect.static path.resolve(yeomanConfig.app)
            ]
    watch:
      options:
        livereload: 35729
      react:
        files: ['<%= yeomanApp %>/scripts/**/*.{cjsx,coffee}']
        tasks: ['browserify:dev']<% if (includeSass) { %>
      styles:
        files: ['<%= yeomanApp %>/styles/**/*.{sass,scss}']
        tasks: ['compass:dev', 'autoprefixer:dev']<% } %>
      images:
        files: [
          '<%= yeomanApp %>/*.html'
          '<%= yeomanApp %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
    clean:
      dist: ['.tmp', '<%= yeomanDist %>/*']
      serve: '.tmp'
    browserify:
      options:
        transform: ['coffee-reactify']
      dist:
        files:
          '.tmp/scripts/app.js': '<%= yeomanApp %>/scripts/app.coffee'
        options:
          browserifyOptions:
            extensions: ['.cjsx', '.coffee']
      dev:
        files:
          '.tmp/scripts/app.js': '<%= yeomanApp %>/scripts/app.coffee'
        options:
          browserifyOptions:
            debug: true
            extensions: ['.cjsx', '.coffee']<% if (includeSass) { %>
    compass:
      options:
        sassDir: '<%= yeomanApp %>/styles'
        cssDir: '.tmp/styles'
        specify: '<%= yeomanApp %>/styles/main.scss'
        imagesDir: '<%= yeomanApp %>/images'
        javascriptsDir: '<%= yeomanApp %>/scripts'
        fontsDir: '<%= yeomanApp %>/fonts'
        relativeAssets: true
      dist: {},
      dev:
        options:
          debugInfo: true<% } %>
    useminPrepare:
      src: '<%= yeomanApp %>/index.html'
      options:
        dest: '<%= yeomanDist %>'
    imagemin:
      dist:
        files: [
          expand: true,
          cwd: '<%= yeomanApp %>/images'
          src: '{,*/}*.{png,jpg,jpeg}'
          dest: '<%= yeomanDist %>/images'
        ]
    htmlmin:
      dist:
        options:
          # removeCommentsFromCDATA: true
          # https://github.com/yeoman/grunt-usemin/issues/44
          collapseWhitespace: true
          collapseBooleanAttributes: true
          # removeAttributeQuotes: true
          removeRedundantAttributes: true
          # useShortDoctype: true
          removeEmptyAttributes: true
          # removeOptionalTags: true
        files: [
          expand: true
          cwd: '<%= yeomanDist %>'
          src: '*.html'
          dest: '<%= yeomanDist %>'
        ]
    filerev:
      dist:
        files: [
          src: [
            '<%= yeomanDist %>/scripts/**/*.js'
            '<%= yeomanDist %>/styles/**/*.css'
            '<%= yeomanDist %>/vendor/**/*.js'
          ]
        ]
    autoprefixer:
      options:
        browsers: [
          'last 5 versions'
        ]<% if (includeSass) { %>
      dev:
        expand: true
        src: '.tmp/styles/*.css'<% } %>
      dist:
        expand: true,
        src: '.tmp/concat/styles/*.css'
    copy:
      dist:
        files: [
          expand: true,
          dot: true,
          cwd: '<%= yeomanApp %>'
          dest: '<%= yeomanDist %>'
          src: [
            '*.html'
            '*.{ico,txt}'
            'images/{,*/}*.{webp,gif}'
          ]
        ]
    usemin:
      html: ['<%= yeomanDist %>/{,*/}*.html']
      css: ['<%= yeomanDist %>/styles/{,*/}*.css']
      options:
        dirs: ['<%= yeomanDist %>']

  grunt.registerTask 'serve', [
    'clean:serve'
    'browserify:dev'<% if (includeSass) { %>
    'compass:dev'
    'autoprefixer:dev'<% } %>
    'connect:livereload'
    'watch'
  ]

  grunt.registerTask 'build', [
    'clean:dist'
    'browserify:dist'<% if (includeSass) { %>
    'compass:dist'<% } %>
    'useminPrepare'
    'concat'
    'autoprefixer:dist'
    'imagemin'
    'cssmin'
    'uglify'
    'copy'
    'filerev'
    'usemin'
    'htmlmin'
  ]

