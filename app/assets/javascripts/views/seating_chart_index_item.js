SeatingApp.Views.SeatingChartIndexItem = Backbone.View.extend({
	template: JST["seating_charts/index_item"],

	initialize: function(){
		this.listenTo(this.model, "sync remove", this.render)
	},

	className: "seating-chart-index-item col-xs-2",

	events:{
		"click .delete-seatingChart" : "deleteSeatingChart",
		"click .show-seatingChart" : "showSeatingChart"
	},

	deleteSeatingChart: function(e){
		e.preventDefault();
		this.model.destroy();
		Backbone.history.navigate("", { trigger: true })
	},

	showSeatingChart: function(e){

		e.preventDefault()
		Backbone.history.navigate("seating_charts/" + this.model.id, { trigger: true })
	},


	render: function(){
		var content = this.template({ seatingChart: this.model })
		this.$el.html(content);
		return this;
	}
})