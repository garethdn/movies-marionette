define(["scripts/app", "scripts/apps/movies/list/MoviesListView", "scripts/common/views/loading"], 
  function(App, MoviesListView, LoadingView){

  App.module("MoviesApp.List", function(List, App, Backbone, Marionette, $, _){

    List.Controller = {
      listMovies: function(query){
        require(["scripts/entities/Movie"], function(){
          App.mainRegion.show(new LoadingView());

          var fetchingMovies = App.request("movie:entities");

          var moviesListLayout = new MoviesListView.Layout();
          var moviesListPanel = new MoviesListView.Panel();

          $.when(fetchingMovies).done(function(movies){

            var moviesListView = new MoviesListView.Movies({
              collection: movies
            });

            moviesListPanel.on("movies:filter", function(query){
              filteredMovies.filter(query);
              App.trigger("movies:filter", query);
            });

            moviesListLayout.on("show", function(){
              moviesListLayout.panelRegion.show(moviesListPanel);
              moviesListLayout.moviesRegion.show(moviesListView);
            });

            moviesListPanel.on("movie:new", function(){
              require(["scripts/apps/movies/new/NewMovieView"], function(NewMovieView){
                var newMovie = App.request("movie:entity:new");

                var view = new NewMovieView.Movie({
                  model: newMovie
                });

                App.mainRegion.show(view);
              });
            });

            moviesListView.on("childview:movie:show", function(childView, args){
              App.trigger("movie:show", args.model.get("id"));
            });

            moviesListView.on("childview:movie:edit", function(childView, args){
              var model = args.model;
              var view = new App.MoviesApp.Edit.Contact({
                model: model
              });

            });

            moviesListView.on("childview:movie:delete", function(childView, args){
              args.model.destroy();
            });

            App.mainRegion.show(moviesListLayout);
          });
        });
      }
    };
  });
  return App.MoviesApp.List.Controller;
});