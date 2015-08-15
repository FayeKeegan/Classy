SeatingApp.Views.SelectableStudentItem = Backbone.View.extend({
	template: JST["students/students_index_item_selectable"],

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
	},

	render: function(){
		var content = this.template({ student: this.model })
		this.$el.html(content)
		return this;
	}
})