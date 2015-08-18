SeatingApp.Views.SeatingChartIndexItem = Backbone.CompositeView.extend({
	template: JST["seating_charts/index_item"],

	initialize: function(options){
		this.section = options.section
		this.addClassroomPreview()
		this.listenTo(this.model, "sync remove", this.render)
	},

	className: "seating-chart-index-item col-xs-2",

	events:{
		"click .delete-seatingChart" : "deleteSeatingChart",
		"click .show-seatingChart" : "showSeatingChart",
		"click .edit-seatingChart" : "editSeatingChart"
	},

	editSeatingChart: function(e){
		e.preventDefault();
		Backbone.history.navigate("seating_charts/" + this.model.id + "/edit", { trigger: true } )
	},

	deleteSeatingChart: function(e){
		e.preventDefault();
		this.model.destroy({
			success: function(){
				this.remove()
				this.collection.remove(this.model)
			}.bind(this)
		})
	},

	showSeatingChart: function(e){
		e.preventDefault();
		Backbone.history.navigate("seating_charts/" + this.model.id, { trigger: true });
	},

	addClassroomPreview: function(){
		// var view = new SeatingApp.Views.ClassroomShowSmall({
		// 	model: this.section
		// })
		// this.addSubview("#classroom-preview", view);
	},

	render: function(){
		var content = this.template({ seatingChart: this.model })
		this.attachSubviews();
		this.$el.html(content);
		return this;
	}
})