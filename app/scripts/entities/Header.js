define(["scripts/app"], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    Entities.Header = Backbone.Model.extend();

    Entities.HeaderCollection = Backbone.Collection.extend({
      model: Entities.Header
    });

    var initializeHeaders = function(){
      Entities.headers = new Entities.HeaderCollection([
        { name: "Contacts", url: "movies", navigationTrigger: "movies:list" },
        { name: "About", url: "about", navigationTrigger: "about:show" }
      ]);
    };

    var API = {
      getHeaders: function(){
        if(Entities.headers === undefined){
          initializeHeaders();
        }
        return Entities.headers;
      }
    };

    App.reqres.setHandler("header:entities", function(){
      return API.getHeaders();
    });
  });

  return;
});