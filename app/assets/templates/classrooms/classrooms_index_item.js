SeatingApp.Views.ClassroomIndexItem = Backbone.CompositeView.extend({
	template: JST["classrooms/index_item"],

	initialize: function(options){
		this.addClassroomPreview()
		this.listenTo(this.model, "sync remove", this.render)
	},

	className: "classroom-index-item col-lg-3",

	events:{
		// "click .delete-seatingChart" : "deleteSeatingChart",
		// "click .show-seatingChart" : "showSeatingChart",
		// "click .edit-seatingChart" : "editSeatingChart",
		// "mouseenter .classroom_square_preview.desk-small" : "highlightDesk",
		// "mouseleave .classroom_square_preview.desk-small" : "unhighlightDesk"
	},

	unhighlightDesk: function(e){
		$(e.currentTarget).removeClass("success").addClass("info")
	},


	highlightDesk: function(e){
		$(e.currentTarget).removeClass("info").addClass("success")
	},

	addClassroomPreview: function(){
		var view = new SeatingApp.Views.ClassroomShowSmall({
			model: this.section
		})
		this.addSubview(".classroom-preview", view);
	},

	render: function(){
		var content = this.template({ seatingChart: this.model })
		this.attachSubviews();
		this.$el.html(content);
		return this;
	}
})