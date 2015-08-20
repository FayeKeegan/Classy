SeatingApp.Views.ClassroomsIndex = Backbone.CompositeView.extend({
	template: JST["classrooms/index"],
	className: "row",

	initialize: function(){
		this.listenTo(this.collection, "add", this.render);
		this.addClassroomNewSubview();
	},

	events: {
		// "mouseenter #seating-chart-index-item" : "seatingChartHighlight",
		// "mouseleave #seating-chart-index-item" : "seatingChartUnhighlight",
		// "mouseenter #new-seating-chart-index-item" : "seatingChartHighlight",
		// "mouseleave #new-seating-chart-index-item" : "seatingChartUnhighlight"
	},

	classroomHighlight: function (e){
		$(e.currentTarget).removeClass("panel-primary").addClass("panel-info");
	},

	classroomUnhighlight: function (e){
		$(e.currentTarget).removeClass("panel-info").addClass("panel-primary");
	},

	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews;
		return this;
	},

	addClassroomNewSubview: function(){
		// this.chartNewSubview = new SeatingApp.Views.ClassroomNewSubview();
		// this.addSubview("#seating-charts-index", this.chartNewSubview);
	}
})