window.SeatingApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	var $rootEl = $("#root")
    var $navBar = $(".nav-bar")
    new SeatingApp.Routers.Router({
    	$rootEl: $rootEl,
      sections: new SeatingApp.Collections.Sections(),
      classrooms: new SeatingApp.Collections.Classrooms()
    })
    Backbone.history.start()
  }
};


