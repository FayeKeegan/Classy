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
			this.sections = options.sections;
			this.classrooms = options.classrooms;
			this.listenTo(this.model, "sync", this.render);
			this.listenTo(this.students, "add", this.addStudent);
			this.listenTo(this.classrooms, "add", this.addClassroom);
		},

		addClassroom: function(classroom, options){
			$("#selectable-classrooms").each(function(classroomOption) { $(classroomOption).attr("selected", false) } )
			var addedClassroom = $("<option>")
				.attr("value", classroom.id)
				.text(classroom.get("name"))
				.attr("selected", true)
			this.$("#selectable-classrooms").append(addedClassroom);
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
			this.classrooms.each(this.addClassroom.bind(this));
			return this;
		},

		newClassroomModal: function(e){
			e.preventDefault();
			var classroom = new SeatingApp.Models.Classroom();
			var newClassroomModal = new SeatingApp.Views.ClassroomNewModal({
				collection: this.classrooms,
				model: classroom
			})
			$('body').append(newClassroomModal.$el);
			newClassroomModal.render();
			$("#classroom-name-input").focus();
		},

		newStudentModal: function(e){
			e.preventDefault();
			var student = new SeatingApp.Models.Student();
			var newStudentModal = new SeatingApp.Views.StudentFormModal({
				model: student,
				collection: this.students
			})
			$('body').append(newStudentModal.$el);
			newStudentModal.render()
			$("#first_name").focus();
		},

		checkedIds: function(){
			var checkedStudents = $(".select-student:checked");
			var checkedStudentIds = $.map(checkedStudents, function(student){
				return $(student).attr("student-id");
			})
			return checkedStudentIds;
		},

		createSection: function(e){
			this.$(".form-group").removeClass("has-error")
			e.preventDefault();
			var checkedIds = this.checkedIds()
			var sectionData = $(e.delegateTarget).find("form").serializeJSON().section;
			if (sectionData.name === ""){
				$(".form-group.section-name").addClass("has-error");
			} 
			if (checkedIds.length === 0){
				this.$(".form-group.select-students").addClass("has-error");
			} else {
				sectionData.student_ids = checkedIds
				var sectionData = {section: sectionData};
				var section = new SeatingApp.Models.Section(sectionData);
				section.save({}, {
					success: function(section){;
						this.sections.add(section)
						Backbone.history.navigate("", { trigger: true });
					}.bind(this)
				})
			}
		},
})