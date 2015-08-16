SeatingApp.Views.SectionNew = Backbone.CompositeView.extend({
		template: JST["sections/new"],

		className: "new-section",

		events: {
			"change .select-student" : "addStudentToSection",
			"click .create-section" : "createSection",
			"click .create-student" : "newStudentModal",
			"click .create-classroom" : "newClassroomModal"
		},

		initialize: function(options) {
			this.students = options.students;
			this.classrooms = options.classrooms;
			this.listenTo(this.model, "sync", this.render);
			this.listenTo(this.students, "add", this.addStudent);
			this.listenTo(this.classrooms, "sync", this.render);
		},

		addStudent: function(student){
			var addedStudent = JST["students/students_index_item_selectable"]({
				student: student
			});
			this.$(".selectable-students").append(addedStudent);
		},
		render: function(){
			var content = this.template({
				section: this.model,
				classrooms: this.classrooms,
				students: this.students
			})
			this.$el.html(content)
			this.students.each(this.addStudent.bind(this));	
			return this;
		},

		newClassroomModal: function(e){
			e.preventDefault();
			var classroom = new SeatingApp.Models.Classroom()
			var newClassroomModal = new SeatingApp.Views.ClassroomNewModal({
				collection: this.classrooms,
				model: classroom
			})
			$('body').append(newClassroomModal.$el);
			newClassroomModal.render()
		},

		newStudentModal: function(e){
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