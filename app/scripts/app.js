define(['marionette'], function(Marionette){
  var App = new Marionette.Application();

  App.addRegions({
    headerRegion  : "#header-region",
    mainRegion    : "#main-region"
  });

  App.navigate = function(route,  options){
    options = options || {};
    Backbone.history.navigate(route, options);
  };

  App.getCurrentRoute = function(){
    return Backbone.history.fragment;
  };

  App.startSubApp = function(appName, args){
    var currentApp = appName ? App.module(appName) : null;
    if (App.currentApp === currentApp){ return; }

    if (App.currentApp){
      App.currentApp.stop();
    }

    App.currentApp = currentApp;
    if(currentApp){
      currentApp.start(args);
    }
  };

  App.on('start', function(){
    if (Backbone.history) {
      require(["scripts/apps/movies/movies_app", "scripts/apps/header/header_app"], function () {
        Backbone.history.start();

        if(App.getCurrentRoute() === ""){
          App.trigger("movies:list");
        }
      });
    }
    console.log('message from App start listener');
  });

  return App;
});