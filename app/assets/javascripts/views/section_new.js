SeatingApp.Views.SectionNew = Backbone.CompositeView.extend({
		template: JST["sections/new"],

		className: "new-section",

		events: {
			"change .select-student" : "addStudentToSection",
			"click .create-section" : "createSection",
			"click .create-student" : "newStudentModal"
		},

		initialize: function(options) {
			this.students = options.students
			this.classrooms = options.classrooms
			this.listenTo(this.model, "sync", this.render)
			this.listenTo(this.students, "sync add", this.render)
			this.listenTo(this.classrooms, "sync", this.render)
			this.students().each()
		},

		render: function(){
			var content = this.template({
				section: this.model,
				classrooms: this.classrooms,
				students: this.students
			})
			this.renderStudents()
			this.$el.html(content)
			return this;
		}

		newStudentModal: function(e){
			// debugger
			e.preventDefault()
			var student = new SeatingApp.Models.Student()
			var newStudentModal = new SeatingApp.Views.StudentsNewModal({
				model : student,
				collection: this.students
			})
			$('body').append(newStudentModal.$el);
			newStudentModal.render()
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
			var section = new SeatingApp.Models.Section(sectionData)
			section.save({}, {
				success: function(){
					Backbone.history.navigate("", { trigger: true })
				}.bind(this)
			})
		},

})