define(['scripts/app'], function(App){
  var moviesAppModule = App.module("MoviesApp", function(MoviesApp, App, Backbone, Marionette, $, _){

    MoviesApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "movies" : "listMovies"
      }
    });

    var executeAction = function(action, arg){
      App.startSubApp("MoviesApp");
      action(arg);
      App.execute("set:active:header", "movies");
    };

    var API = {
      listMovies: function(query){
        require(["scripts/apps/movies/list/MoviesListController"], function(MoviesListController){
          executeAction(MoviesListController.listMovies, query);
        });
      }
    };

    App.on("movies:list", function(){
      App.navigate("movies");
      API.listMovies();
    });

    App.on("movies:filter", function(query){
      if(query){
        App.navigate("movies/filter/query:" + query);
      }
      else{
        App.navigate("movies");
      }
    });

    App.addInitializer(function(){
      new MoviesApp.Router({
        controller: API
      });
    });

  });

  return moviesAppModule;
});