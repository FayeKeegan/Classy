SeatingApp.Views.SectionNew = Backbone.CompositeView.extend({
		template: JST["sections/new"],

		className: "new-section",

		events: {
			"change .select-student" : "addStudentToSection" 
		},

		initialize: function(options) {
			this.students = options.students
			this.classrooms = options.classrooms
			this.listenTo(this.model, "sync", this.render)
			this.listenTo(this.students, "sync", this.render)
			this.listenTo(this.classrooms, "sync", this.render)
			this.listenTo(this.model.students(), "add", this.addStudentItem.bind(this))

		},

		addStudentToSection: function(e){
			var studentId = $(e.currentTarget).attr("student-id")
			var student = this.students.getOrFetch(studentId)
			this.model.students().add(student)
		},

		addStudentItem: function(student){
			debugger
			var view = new SeatingApp.Views.AddedStudentItem({ model: student })
			this.addSubview("#added-students-list", view)
		},


		render: function(){
			var content = this.template({
				section: this.model,
				classrooms: this.classrooms,
				students: this.students
			})
			this.attachSubviews();
			this.$el.html(content)
			return this;
		}
})