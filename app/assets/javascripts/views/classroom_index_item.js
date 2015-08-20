SeatingApp.Views.ClassroomIndexItem = Backbone.CompositeView.extend({
	template: JST["classrooms/index_item"],

	initialize: function(options){
		this.addClassroomPreview()
		this.listenTo(this.model, "sync remove", this.render)
	},

	className: "classroom-index-item col-lg-3",

	events:{
		"mouseenter .panel" : "highlightPanel",
		"mouseleave .panel" : "unhighlightPanel",
		"mouseenter .classroom_square_preview.desk-small" : "highlightDesk",
		"mouseleave .classroom_square_preview.desk-small" : "unhighlightDesk"
	},

	highlightPanel: function(e){

		$(e.currentTarget).removeClass("panel-success").addClass("panel-info")
	},

	unhighlightPanel: function(e){
		$(e.currentTarget).removeClass("panel-info").addClass("panel-success")
	},

	unhighlightDesk: function(e){
		$(e.currentTarget).removeClass("success").addClass("info")
	},


	highlightDesk: function(e){
		$(e.currentTarget).removeClass("info").addClass("success")
	},

	addClassroomPreview: function(){
		var view = new SeatingApp.Views.ClassroomShowSmall({
			model: this.model
		})
		this.addSubview(".classroom-preview", view);
	},

	render: function(){
		var content = this.template({ classroom: this.model })
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})