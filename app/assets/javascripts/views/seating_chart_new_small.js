SeatingApp.Views.SeatingChartNewSmall = Backbone.View.extend({
	template: JST["seating_charts/new_small"],

	className: "col col-lg-3 new-seating-chart",

	render: function(){
		var content = this.template({ seatingChart: this.model })
		this.$el.html(content)
		return this
	}
})