SeatingApp.Views.ClassroomsIndex = Backbone.CompositeView.extend({
	template: JST["classrooms/index"],
	className: "row",

	initialize: function(){
		this.listenTo(this.collection, "sync", this.render)
		this.collection.each(this.addClassroomIndexItem.bind(this));
		this.listenTo(this.collection, "add", this.addClassroomIndexItem)
		this.listenTo(this.collection, "remove", this.removeClassroomIndexItem)
		this.addNewClassroomSubview();
	},

	removeClassroomIndexItem: function(classroom){
		this.removeModelSubview("#classrooms-index", classroom);
	},

	addNewClassroomSubview: function(){
		var newClassroom = new SeatingApp.Models.Classroom({
			height: 8,
			width: 10,
			name: "New Classroom",
		})
		var newClassroomSubview = new SeatingApp.Views.ClassroomNewSmall({
			model: newClassroom
		})
		this.addSubview("#new-classroom-subview", newClassroomSubview)
	},

	classroomHighlight: function (e){
		$(".body").animateScroll();
		$(e.currentTarget).removeClass("panel-primary").addClass("panel-info");
	},

	classroomUnhighlight: function (e){
		$(e.currentTarget).removeClass("panel-info").addClass("panel-primary");
	},

	addClassroomIndexItem: function(classroom){
		var view = new SeatingApp.Views.ClassroomIndexItem({
			model: classroom,
			collection: this.collection
		});
		this.addSubview("#classrooms-index", view);
	},

	render: function(){
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

})