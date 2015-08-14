SeatingApp.Views.SectionNew = Backbone.View.extend({
		template: JST["sections/new"],

		className: "new-section",

		events: {
			"change .select-student" : "addStudentToSection",
			"click .create-section" : "createSection"
		},

		createSection: function(e){
			e.preventDefault();
			var sectionData = $(e.delegateTarget).find("form").serializeJSON().section
			var checkedStudents = $(".select-student:checked")
			var checkedStudentIds = $.map(checkedStudents, function(student){
				return $(student).attr("student-id")
			})
			sectionData.student_ids = checkedStudentIds
			var sectionData = {section: sectionData}
			debugger
			var section = new SeatingApp.Models.Section(sectionData)
			section.save({}, {
				success: function(){
					Backbone.history.navigate("", { trigger: true })
				}.bind(this)
			})
		},

		initialize: function(options) {
			this.students = options.students
			this.classrooms = options.classrooms
			this.listenTo(this.model, "sync", this.render)
			this.listenTo(this.students, "sync", this.render)
			this.listenTo(this.classrooms, "sync", this.render)
		},

		render: function(){
			var content = this.template({
				section: this.model,
				classrooms: this.classrooms,
				students: this.students
			})
			this.$el.html(content)
			return this;
		}
})