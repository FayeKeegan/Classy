SeatingApp.Views.SeatingChartNew = Backbone.View.extend({
	template: JST["seating_charts/new"],

	className: "new-seating-chart",

	render: function(){
		var content = this.template({ seatingChart: this.model })
		this.$el.html(content)
		return this
	}
})