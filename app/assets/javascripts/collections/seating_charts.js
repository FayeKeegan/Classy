SeatingApp.Collections.SeatingCharts = Backbone.Collection.extend({
	url: "api/seating_charts",
	
	model: SeatingApp.Models.SeatingChart
})