'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt); // Load NPM Tasks
  require('time-grunt')(grunt); // Displays the elapsed execution time of grunt tasks

  grunt.initConfig({ // Project configuration.

    paths: { // configurable paths

      themeName:        'xxx', // Replace xxx with theme's name
      //themeFolder:      'assets/themes/<%= paths.themeName %>/_', // Wordpress workflow
      themeFolder:      'assets', // HTML workflow

      devFolder:        'dev',
      devJs:            'dev/js/**/*.js',
      devCss:           'dev/sass',
      devTmp:           'dev/tmp',
      devImgLayout:     'dev/img/layout',
      devImgTmp:        'dev/img/tmp',
      devSVG:           'dev/img/svgs'
      //distImgLayout:    'dev/img/layout'
    },

    server: {
      distHost:          'hostname or IP',
      distUser:          'username',
      distRemoteBase:    '~/www',

      devHost:          'hostname or IP',
      devUser:          'username',
      devRemoteBase:    '~/www'
    },

    // Store your Package file so you can reference its specific data whenever necessary
    pkg: grunt.file.readJSON('package.json'),


    // Javascript //
    // ############################################################################## //
    concat: {
      options: {
        //separator: ';',
      },
      dist: {
        src: [ '<%= paths.devJs %>','!<%= paths.devFolder %>/**/modernizr-*.js' ],
        dest: '<%= paths.devTmp %>/concat.js',
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        curly:   true,
        eqeqeq:  true,
        immed:   true,
        latedef: true,
        newcap:  true,
        noarg:   true,
        sub:     true,
        undef:   true,
        boss:    true,
        eqnull:  true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      dist: {
        src: ['Gruntfile.js', '<%= paths.devJs %>']
      }
      //afterconcat: ['<%= paths.devTmp %>/concat.js']
    },

    uglify: {
      dev: {
        options: {
          mangle: {
            ie8: true,
          },
        },
        compress: {
          ie8: true,
          sequences: true,
          //distperties: true,
          dead_code: true,
          drop_debugger: true,
          comparisons: true,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          if_return: true,
          join_vars: true,
          cascade: true,
          //negate_iife: true,
          drop_console: false
        },
        files: {
          '<%= paths.themeFolder %>/js/main.min.js' : ['<%= paths.devTmp %>/concat.js'],
        },
      },

      dist: {
        options: {
          mangle: {
            ie8: true,
          }
        },
        compress: {
          ie8: true,
          sequences: true,
          //distperties: true,
          dead_code: true,
          drop_debugger: true,
          comparisons: true,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          if_return: true,
          join_vars: true,
          cascade: true,
          //negate_iife: true,
          drop_console: true
        },

        files: {
          '<%= paths.themeFolder %>/js/main.min.js' : ['<%= paths.devTmp %>/concat.js'],
        },
      },
    },


    // Stylesheets //
    // ############################################################################## //
    sass: {
      dev: {
        options: {
          style: 'expanded',
          //debugInfo: true,
          lineNumbers: true,
          sourcemap: 'auto'
        },
        files: {
          '<%= paths.themeFolder %>/css/main.min.css': '<%= paths.devCss %>/main.scss',
        },
      },

      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          '<%= paths.themeFolder %>/css/main.min.css': '<%= paths.devCss %>/main.scss'
        },
      }
    },


    // Image optimization //
    // ############################################################################## //
    imagemin: { // `optimizationLevel` is only applied to PNG files (not JPG)

      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
        {
          expand: true,
          cwd: '<%= paths.devImgLayout %>/',
          src: ['**/*.png'],
          dest: '<%= paths.themeFolder %>/img/layout/',
          ext: '.png'
        }
        ]
      },

      jpg: {
        options: {
          distgressive: true
        },
        files: [
        {
          expand: true,
          cwd: '<%= paths.devImgLayout %>/',
          src: ['**/*.jpg'],
          dest: '<%= paths.themeFolder %>/img/layout/',
          ext: '.jpg'
        }
        ]
      }
    },

    // SVG sprite //
    // ############################################################################## //
    svgstore: {
      options: {
        prefix : 'shape-', // This will prefix each ID
        svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
          // viewBox : '0 0 100 100',
          // xmlns: 'http://www.w3.org/2000/svg'
        },
        cleanup: false
      },
      dist: {
        files: {
          '<%= paths.themeFolder %>/img/layout/sprite-defs.svg': ['<%= paths.devSVG %>/*.svg'],
        },
      },
    },

    // SVG optimization //
    // ############################################################################## //
    // svgmin: {
    //   options: {
    //     plugins: [
    //       { removeViewBox: false },
    //       { removeUselessStrokeAndFill: false }
    //     ]
    //   },
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '<%= paths.devImgLayout %>/',
    //       src: '{,*/}*.svg',
    //       dest: '<%= paths.themeFolder %>/img/layout/'
    //     }]
    //   }
    // },


    // Watch changed files and reload //
    // ############################################################################## //
    watch: {
      images: {
        tasks: ['newer:imagemin'],
        files: ['<%= paths.devImgLayout %>/**/*.{png,jpg,gif,ico}']
      },
      imagesTmp: {
        tasks: ['copy:dist'],
        files: ['<%= paths.devImgTmp %>/**/*.{png,jpg,gif,ico}']
      },
      svgstore: {
        tasks: ['svgstore:dist'],
        files: ['<%= paths.devSVG %>/*.svg']
      },
      // svgstore: {
      //   tasks: ['svgstore:dist'],
      //   files: ['<%= paths.devSVG %>/*.svg']
      // },
      // svgmin: {
      //   tasks: ['svgmin:dist'],
      //   files: ['<%= paths.devImgLayout %>/*.svg']
      // },
      css: {
        tasks: ['sass:dev'],
        files: ['<%= paths.devCss %>/**/*.scss']
      },
      js: {
        tasks: ['concat','uglify:dev'],
        files: ['<%= paths.devJs %>']
      },
      livereload: {
        options: { livereload: true },
        files: ['<%= paths.themeFolder %>/**/*.{css,js}']
      }
    },


    // Inject new code //
    // ############################################################################## //
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            '<%= paths.themeFolder %>/css/*.css',
            '<%= paths.themeFolder %>/js/*.js',
            '<%= paths.themeFolder %>/*.html',
            '**/*.php',
            '<%= paths.themeFolder %>/inc/*.php',
            '<%= paths.themeFolder %>/**/*.{jpg,png,svg}'
          ],
        },
        options: {
          debugInfo: true,
          logConnections: true,
          notify: true,
          proxy: "localhost:8888",
          watchTask: true,
          //notify: false, // Don't show any notifications in the browser.
          ghostMode: {
            scroll: true,
            links: true,
            forms: true
          }
        }
      }
    },


    // Copy tmp images //
    // ############################################################################## //
    copy: {
      dist: {
        files: [
          {
            expand: true,
            src: ['<%= paths.devImgTmp %>/*'],
            dest: '<%= paths.themeFolder %>/_/img/tmp/',
            flatten: true
            //filter: 'isFile'
          }
        ]
      }
    },

    clean: {
      dist: '<%= paths.themeFolder %>'
    },


  });
  // Watch for file changes
  //grunt.registerTask('default', ['watch']);
  grunt.registerTask('default', ['browserSync','watch']);

  // Create dist files
  grunt.registerTask('dist', [
    //'jshint',
    'clean',
    'concat',
    'uglify:dist',
    'sass:dist',
    'copy'
  ]);

  // Create dist files and deploy to dev
  grunt.registerTask('deploy-dev', [
    //'jshint',
    'clean',
    'concat',
    'uglify:dist',
    'sass:dist',
    'imagemin',
    'copy',
  ]);

  // Create dist files and deploy to dist
  grunt.registerTask('deploy-dist', [
    'clean',
    'concat',
    //'jshint',
    'uglify:dist',
    'sass:dist',
    'imagemin',
    'copy',
  ]);

};