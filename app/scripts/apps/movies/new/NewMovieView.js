define(["scripts/app", "scripts/apps/movies/common/views/Form"], function(App, FormView){
  App.module("MoviesApp.New.View", function(View, App, Backbone, Marionette, $, _){
    View.Movie = FormView.extend({
      title: "New Contact",

      onRender: function(){
        this.$(".js-submit").text("Create movie");
      }
    });
  });

  return App.MoviesApp.New.View;
});