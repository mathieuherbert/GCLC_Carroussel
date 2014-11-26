'use strict';

module.export = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    uglify: {
      options: {
        banner: '/*! (c) it-gems.com 2014 Filanthropes */\n'
      },
      build: {
        src: ['js/jquery.js', 'js/responsiveImage.js', 'js/slideshow.js' ], //Use a comma-separated list of the JS files you want to minify
        dest: '<%= pkg.srcDir %>/built.min.js'
      }
    },

    cssmin: {
      add_banner: {
        options: {
          banner: '/* CSS minified (c) Filanthropes 2014 */'
        },
        files: {
          'css/*.min.css': ['css/*.css'] //The list of CSS files to minify
        }
      }
    }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Load the plugin to minify CSSs
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('load-grunt-tasks');

  grunt.registerTask('default', [
    'uglify',
    'cssmin'
  ]);

};
