SeatingApp.Views.StudentsIndexSelectable = Backbone.CompositeView.extend({
	template: JST["students/students_index_selectable"],

	initialize: function(){
		this.listenTo(this.collection, "sync", this.render)
		this.listenTo(this.collection, "add", this.addSelectableStudent)
		// this.collection.each(this.addSelectableStudent.bind(this))
	},

	addSelectableStudent: function(student){
		var view = new SeatingApp.Views.SelectableStudentItem({
			model: student
		})
		this.attachSubviews(".students-index-selectable", view)
	},

	addStudents: function(){
		this.collection.each(this.addSelectableStudent.bind(this))
	},
	
	render: function(){
		var content = this.template()
		this.$el.html(content)
		this.addStudents();
		this.attachSubviews();
		return this;
	}
})