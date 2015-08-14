SeatingApp.Views.StudentIndexItemDraggable = Backbone.View.extend({
	template: JST["students/student_index_item_draggable"],

	className: "student-index-item",

	tagName: "tr",

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
	},

	render: function(){
		var content = this.template({ student: this.model })
		this.$el.html(content);
		return this;
	}
})

