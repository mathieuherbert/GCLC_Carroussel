
module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    uglify: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'js',
          src: '**/*.js',
          dest: 'dest/js'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          src: ['index.html', 'twitter.html'],
          dest: 'dest'
        }]
      }
    },

    copy: {
      main: {
        files: [
        // Copies files from the source folder to your local Apache folder
          {expand: true, src: ['css/*.min.css'],
            dest: 'dest'},
          {expand: true, src: ['img/*'],
            dest: 'dest/', filter: 'isFile'},
          {expand: true, src: ['img/**'],
            dest: 'dest/'},
          {expand: true, src: ['**/quojs/*'],
            dest: 'dest/js', filter: 'isFile'},
          {expand: true, src: ['**/quojs/**'],
            dest: 'dest/js'},
          {expand: true, src: ['backoffice/*'],
            dest: 'dest', filter: 'isFile'},
          {expand: true, src: ['frontend/*'],
            dest: 'dest'},
          {expand: true, src: ['updateImages.sh'],
            dest: 'dest'},
          {expand: true, src: ['GreenCodeLabChallenge_FILanthropes.pdf'],
            dest: 'dest'}
        ],
      },
    },

    cssmin: {
      add_banner: {
        files: {
          'dest/css/gclc.css': ['css/gclc.css'] //The list of CSS files to minify
        }
      }
    }
  });

  //Load the plugin that copies files and directories
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  //Load the plugin to minify CSSs
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', [
  'uglify',
  'htmlmin',
  'cssmin',
  'copy'
  ]);

};
