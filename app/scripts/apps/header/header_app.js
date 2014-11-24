define(["scripts/app", "scripts/apps/header/list/HeaderListController"], function(App, ListController){
  App.module("HeaderApp", function(Header, App, Backbone, Marionette, $, _){
    var API = {
      listHeader: function(){
        ListController.listHeader();
      }
    };

    App.commands.setHandler("set:active:header", function(name){
      ListController.setActiveHeader(name);
    });

    Header.on("start", function(){
      API.listHeader();
    });
  });

  return App.HeaderApp;
});