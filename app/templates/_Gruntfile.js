'use strict';

var livereload = require('connect-livereload'),
    path = require('path');

module.exports = function (grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var yeomanConfig = {
      app: 'app',
      dist: 'dist'
  };

  grunt.initConfig({
      yeoman: yeomanConfig,
      connect: {
          options: {
            port: 3000,
            hostname: '0.0.0.0' //change to 'localhost' to disable outside connections
          },
          livereload: {
            options: {
              middleware: function (connect) {
                return [
                  livereload({port: 35729}),
                  connect.static(path.resolve('.tmp')),
                  connect.static(path.resolve(yeomanConfig.app))
                ];
              }
            }
          }
      },
      watch: {
        options: {
          livereload: 35729
        },
        react: {
          files: ['<%= yeomanApp %>/scripts/**/*.{jsx,js}'],
          tasks: ['browserify:dev']
        },
        images: {
          files: [
            '<%= yeomanApp %>/*.html',
            '<%= yeomanApp %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      },
      clean: {
        dist: ['.tmp', '<%= yeomanDist %>/*'],
        serve: '.tmp'
      },
      browserify: {
        options: {
          transform: ['reactify']
        },
        dist: {
          files: {
            '.tmp/scripts/app.js': '<%= yeomanApp %>/scripts/app.js'
          },
          options: {
            browserifyOptions: {
              extensions: '.jsx'
            }
          }
        },
        dev: {
          files: {
            '.tmp/scripts/app.js': '<%= yeomanApp %>/scripts/app.js',
          },
          options: {
            browserifyOptions: {
              debug: true,
              extensions: '.jsx'
            }
          }
        }
      },
      useminPrepare: {
        src: '<%= yeomanApp %>/index.html',
        options: {
            dest: '<%= yeomanDist %>'
        }
      },
      imagemin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= yeomanApp %>/images',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= yeomanDist %>/images'
          }]
        }
      },
      htmlmin: {
        dist: {
          options: {
            //removeCommentsFromCDATA: true,
            // https://github.com/yeoman/grunt-usemin/issues/44
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            //removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            //useShortDoctype: true,
            removeEmptyAttributes: true,
            //removeOptionalTags: true
          },
          files: [{
            expand: true,
            cwd: '<%= yeomanDist %>',
            src: '*.html',
            dest: '<%= yeomanDist %>'
          }]
        }
      },
      filerev: {
        dist: {
          files: [{
            src: [
              '<%= yeomanDist %>/scripts/**/*.js',
              '<%= yeomanDist %>/styles/**/*.css',
              '<%= yeomanDist %>/vendor/**/*.js'
            ]
          }]
        }
      },
      autoprefixer: {
        options: {
          browsers: [
            'last 5 versions'
          ]
        },
        dist: {
          expand: true,
          src: '.tmp/concat/styles/*.css'
        }
      },
      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeomanApp %>',
            dest: '<%= yeomanDist %>',
            src: [
              '*.html',
              '*.{ico,txt}',
              'images/{,*/}*.{webp,gif}'
            ]
          }]
        }
      },
      usemin: {
        html: ['<%= yeomanDist %>/{,*/}*.html'],
        css: ['<%= yeomanDist %>/styles/{,*/}*.css'],
        options: {
          dirs: ['<%= yeomanDist %>']
        }
      }
  });

  grunt.registerTask('serve', [
    'clean:serve',
    'browserify:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'browserify:dist',
    'useminPrepare',
    'concat',
    'autoprefixer:dist',
    'imagemin',
    'cssmin',
    'uglify',
    'copy',
    'filerev',
    'usemin',
    'htmlmin'
  ]);
};
