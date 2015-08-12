SeatingApp.Views.SeatingChartIndexItem = Backbone.View.extend({
	template: JST["seating_charts/index_item"],

	initialize: function(){
		this.listenTo(this.model, "sync destroy", this.render)
	},

	className: "seating-chart-index-item col-lg-4",

	events:{
		"click .delete-seatingChart" : "deleteSeatingChart"
	},

	deleteSeatingChart: function(e){
		e.preventDefault();
		this.model.destroy();
		Backbone.history.navigate("", { trigger: true })
	},


	render: function(){
		var content = this.template({ seatingChart: this.model })
		this.$el.html(content);
		return this;
	}
})