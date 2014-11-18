module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var appConfig = {
    app     : 'app',
    bower   : 'bower_components',
    dist    : 'dist',
    vendor  : 'dist/scripts/vendor'
  };
  
  grunt.initConfig({

    appConfig: appConfig,

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';',
        sourceMap: true
      },
      dist: {
        // the files to concatenate
        src: ['<%= appConfig.app %>/scripts/**/*.js'],
        // the location of the resulting JS file
        dest: '<%= appConfig.dist %>/app.concat.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true,
        sourceMapIncludeSources: true,
        sourceMapIn: '<%= concat.dist.dest %>.map'
      },
      dist: {
        files: {
          '<%= appConfig.dist %>.app.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    copy: {
      app: {
        files: [
          // vendor
          { src: '<%= appConfig.bower %>/jquery/dist/jquery.min.js', dest: '<%= appConfig.vendor %>/jquery.min.js' },
          { src: '<%= appConfig.bower %>/underscore/underscore.js', dest: '<%= appConfig.vendor %>/underscore.js' },
          { src: '<%= appConfig.bower %>/backbone/backbone.js', dest: '<%= appConfig.vendor %>/backbone.js' },
          { src: '<%= appConfig.bower %>/backbone.babysitter/lib/backbone.babysitter.min.js', dest: '<%= appConfig.vendor %>/backbone.babysitter.min.js' },
          { src: '<%= appConfig.bower %>/backbone.wreqr/lib/backbone.wreqr.min.js', dest: '<%= appConfig.vendor %>/backbone.wreqr.min.js' },
          { src: '<%= appConfig.bower %>/marionette/lib/backbone.marionette.min.js', dest: '<%= appConfig.vendor %>/backbone.marionette.min.js' },
          { src: '<%= appConfig.bower %>/handlebars/handlebars.min.js', dest: '<%= appConfig.vendor %>/handlebars.min.js' },
          { src: '<%= appConfig.bower %>/handlebars/handlebars.runtime.min.js', dest: '<%= appConfig.vendor %>/handlebars.runtime.min.js' },
          { src: '<%= appConfig.bower %>/momentjs/moment.js', dest: '<%= appConfig.vendor %>/moment.js' },
          { src: '<%= appConfig.bower %>/bootstrap/dist/js/bootstrap.min.js', dest: '<%= appConfig.vendor %>/bootstrap.min.js' },

          { src: '<%= appConfig.bower %>/bootstrap/dist/css/bootstrap.min.css', dest: '<%= appConfig.dist %>/styles/bootstrap.min.css' },
          { src: '<%= appConfig.bower %>/fontawesome/css/font-awesome.min.css', dest: '<%= appConfig.dist %>/styles/font-awesome.min.css.css' },

          // images
          { expand: true, cwd: '<%= appConfig.app %>/images/', src: '**', dest: '<%= appConfig.dist %>/images/' }
        ]
      }
    }
  });

  grunt.registerTask('default', ['uglify']);

};