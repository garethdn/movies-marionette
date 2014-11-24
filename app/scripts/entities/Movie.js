define(["scripts/app", "scripts/apps/config/storage/localstorage"], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

    Entities.Movie = Backbone.Model.extend({

      urlRoot: "api/movies",

      defaults: {
        title: "",
        year: "",
        rating: ""
      }
    });

    Entities.configureStorage(Entities.Movie);

    Entities.MovieCollection = Backbone.Collection.extend({

      url: "api/movies",

      model: Entities.Movie,

      comparator: "title"

    });

    Entities.configureStorage(Entities.MovieCollection);

    var getMovies = function(){
      return new Entities.MovieCollection([
        { id: 1, title: "Fight Club", rating: "7", year: "1999" },
        { id: 2, title: "The Matrix", rating: "8", year: "2001" },
        { id: 3, title: "The Avengers", rating: "9.1", year: "2012" }
      ]);
    };

    var API = {
      getMovieEntities: function(){
        var movies = new Entities.MovieCollection();
        var defer = $.Deferred();

        movies.fetch({
          success: function(data){
            defer.resolve(data);
          }
        });

        return defer.promise();
      },

      getMovieEntity: function(contactId){
        var contact = new Entities.Contact({id: contactId});
        var defer = $.Deferred();
        setTimeout(function(){
          contact.fetch({
            success: function(data){
              defer.resolve(data);
            },
            error: function(data){
              defer.resolve(undefined);
            }
          });
        }, 2000);
        return defer.promise();
      }
    };

    App.reqres.setHandler("movie:entities", function(){
      return API.getMovieEntities();
    });

    App.reqres.setHandler("movie:entity", function(id){
      return API.getMovieEntity(id);
    });

    App.reqres.setHandler("movie:entity:new", function(id){
      return new Entities.Movie();
    });
  });

  return;
});