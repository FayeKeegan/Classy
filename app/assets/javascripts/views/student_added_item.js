SeatingApp.Views.AddedStudentItem = Backbone.View.extend({
	template: JST["students/added_student_item"],

	initialize: function(){
	},

	render: function(){
		var content = this.template({ student: this.model })
		this.$el.html(content)
		return this
	}
})