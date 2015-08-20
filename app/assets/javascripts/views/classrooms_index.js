SeatingApp.Views.ClassroomsIndex = Backbone.CompositeView.extend({
	template: JST["classrooms/index"],
	className: "row",

	initialize: function(){
		this.listenTo(this.collection, "sync", this.render)
		this.collection.each(this.addClassroomIndexItem.bind(this));
		this.listenTo(this.collection, "add", this.addClassroomIndexItem)
		// this.listenTo(this.collection, "add", this.addClassroomSubview);
		// this.addClassroomNewSubview();
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

	addClassroomIndexItem: function(classroom){
		var view = new SeatingApp.Views.ClassroomIndexItem({ model: classroom });
		this.addSubview("#classrooms-index", view);
	},

	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	addClassroomNewSubview: function(){
		// this.chartNewSubview = new SeatingApp.Views.ClassroomNewSubview();
		// this.addSubview("#seating-charts-index", this.chartNewSubview);
	}
})