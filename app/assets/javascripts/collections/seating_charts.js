SeatingApp.Collections.SeatingCharts = Backbone.Collection.extend({
	url: "api/seating_charts",

	model: SeatingApp.Models.SeatingChart,
	
	getOrFetch: function(id){
		var seatingChart = this.get(id)
		if (!seatingChart){
			seatingChart = new SeatingApp.Models.SeatingChart({ id: id })
			this.add(seatingChart)
		}
		seatingChart.fetch();
		return seatingChart;
	}
})