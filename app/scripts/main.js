requirejs.config({
  baseUrl: "app",
  paths: {
    'jquery'      : 'bower_components/jquery/dist/jquery',
    'underscore'  : 'bower_components/underscore/underscore',
    'backbone'    : 'bower_components/backbone/backbone',
    'marionette'  : 'bower_components/marionette/lib/backbone.marionette',
    'localstorage': 'bower_components/backbone.localStorage/backbone.localStorage',
    'hbs'         : 'bower_components/require-handlebars-plugin/hbs'
  }
});

require(['scripts/app'], function(MoviesApp){
  MoviesApp.start();
});