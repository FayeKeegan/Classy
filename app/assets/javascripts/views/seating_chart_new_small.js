SeatingApp.Views.SeatingChartNewSmall = Backbone.View.extend({
	template: JST["seating_charts/new_small"],

	className: "new-seating-chart col-xs-2",

	render: function(){
		var content = this.template({ seatingChart: this.model })
		this.$el.html(content)
		return this
	}
})