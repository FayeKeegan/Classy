window.SeatingApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new SeatingApp.Routers.Router()
    Backbone.history.start()
  }
};

$(document).ready(function(){
  SeatingApp.initialize();
});
