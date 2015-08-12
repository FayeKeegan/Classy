SeatingApp.Views.SeatingChartIndexItem = Backbone.View.extend({
	template: JST["seating_charts/index_item"],

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
	},

	className: "seating-chart-index-item col-lg-4",

	render: function(){
		var content = this.template({ seatingChart: this.model })
		this.$el.html(content);
		return this;
	}
})