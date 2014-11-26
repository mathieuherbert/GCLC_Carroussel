'use strict';

module.export = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    uglify: {
      build: {
        files: [{
          expand: true,
          src: '**/*.js',
          dest: 'dest/js',
          cwd: '.'
        }]
      }
    }
  });

  grunt.registerTask('build', [
    'uglify'
  ]);

};
