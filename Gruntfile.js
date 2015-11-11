'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        keepSpecialComments: 0
      },
      target: {
        files: {
          'build/css/all.min.css': ['vendor/angularmaterial/css/angular-material.min.css']
        }
      }
    },

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['uglify:watch'],
        options: {
          spawn: false
        },
      },
    },

    uglify: {
      watch: {
        files: {
          'build/js/index.min.js': ['dist/js/index.js']
        }
      },
      default: {
        files: {
          'build/js/libraries.min.js': [
            'vendor/angularjs/angular.min.js',
            'vendor/angularjs/angular-animate.min.js',
            'vendor/angularjs/angular-route.min.js',
            'vendor/angularjs/angular-aria.min.js',
            'vendor/angularjs/angular-messages.min.js',
            'vendor/angularmaterial/js/angular-material.min.js'
          ],
          'build/js/index.min.js': ['dist/js/index.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'cssmin',
    'uglify'
  ]);
};