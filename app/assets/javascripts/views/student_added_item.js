SeatingApp.Views.AddedStudentItem = Backbone.View.extend({
	template: JST["students/added_student_item"],

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
	},

	render: function(){
		var content = this.template({ student: this.model })
		this.$el.html(content)
		return this
	}
})