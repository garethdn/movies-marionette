define(["scripts/app", 
    "hbs!templates/movies/layout",
    "hbs!templates/movies/panel",
    "hbs!templates/movies/list",
    "hbs!templates/movies/list_item",
    "hbs!templates/movies/none"], function(App, layoutTmpl, panelTmpl, listTmpl, listItemTmpl, emptyTmpl){  
  App.module("MoviesApp.List.View", function(View, App, Backbone, Marionette, $, _){

    View.Layout = Marionette.LayoutView.extend({
      template: layoutTmpl,

      regions: {
        panelRegion: "#panel-region",
        moviesRegion: "#movies-region"
      }
    });

    View.Panel = Marionette.ItemView.extend({
      template: panelTmpl,

      triggers: {
        "click button.js-new": "movie:new"
      },

      events: {
        "submit #filter-form": "filterContacts"
      }

    });

    View.Movie = Marionette.ItemView.extend({
      tagName: "tr",
      template: listItemTmpl,

      triggers: {
        "click td a.js-show"      : "movie:show",
        "click td a.js-edit"      : "movie:edit",
        "click button.js-delete"  : "movie:delete"
      },

      events: {
        "click" : "highlightName"
      },

      flash: function(cssClass){
        var $view = this.$el;
        $view.hide().toggleClass(cssClass).fadeIn(800, function(){
          setTimeout(function(){
            $view.toggleClass(cssClass);
          }, 500);
        });
      },

      highlightName: function(e){
        this.$el.toggleClass("warning");
      },

      remove: function(){
        var self = this;
        this.$el.fadeOut(function(){
          Marionette.ItemView.prototype.remove.call(self);
        });
      }
    });

    var NoMoviesView = Marionette.ItemView.extend({
      template: emptyTmpl,
      tagName: "tr",
      className: "alert"
    });

    View.Movies = Marionette.CompositeView.extend({
      tagName             : "table",
      className           : "table table-hover",
      template            : listTmpl,
      emptyView           : NoMoviesView,
      childView           : View.Movie,
      childViewContainer  : "tbody",

      initialize: function(){
        this.listenTo(this.collection, "reset", this.onResetCollection);
      },

      attachHtml: function(collectionView, childView, index){
        collectionView.$el.append(childView.el);
      },

      onRenderCollection: function(){
        this.attachHtml = function(collectionView, childView, index){
          collectionView.$el.prepend(childView.el);
        };
      },

      onResetCollection: function(){
        console.info('on sync');
      }
    });
  });

  return App.MoviesApp.List.View;

});