window.SeatingApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	var $rootEl = $("#root")
    new SeatingApp.Routers.Router({
    	$rootEl: $rootEl,
      seatingCharts: new SeatingApp.Collections.SeatingCharts()
    })
    Backbone.history.start()
  }
};
