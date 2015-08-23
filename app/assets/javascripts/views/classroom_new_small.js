SeatingApp.Views.ClassroomNewSmall = Backbone.CompositeView.extend({
	template: JST["classrooms/new_index_item"],

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

	highlightPanel: function(e) {
		this.$(".btn").toggleClass("btn-info").toggleClass("btn-default")
		this.$(".active").removeClass("active").addClass("info")
		this.$(".panel.new-classroom-panel").removeClass("new-classroom-panel");
		this.$(".panel-heading.new-classroom-panel-header").removeClass("new-classroom-panel-header")
	},

	unhighlightPanel: function(e){
		this.$(".btn").toggleClass("btn-info").toggleClass("btn-default")
		this.$(".info").removeClass("info").addClass("active")
		this.$(".panel").addClass("new-classroom-panel");
		this.$(".panel-heading").addClass("new-classroom-panel-header");
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