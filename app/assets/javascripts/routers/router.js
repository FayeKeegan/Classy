SeatingApp.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.sections = options.sections;
		this.classrooms = options.classrooms;
		this.students = options.students;
	},

	routes: {
		"": "sectionsIndex",
		"classrooms": "classroomsIndex",
		"classrooms/new": "classroomNew",
		"students": "studentsIndex",
		"students/new": "studentsNew",
		"classrooms/:id/edit": "classroomEdit",
		"students/new": "studentsNew",
		"seating_charts/:id/edit": "seatingChartEdit",
		"section/new": "sectionNew",
		"sections/:id": "sectionShow",
		"seating_charts/:id": "seatingChartShow"
	},

	sectionShow: function(id) {
		var targetSection = id;
		this.sections.fetch();
		var view = new SeatingApp.Views.SectionsIndex({
			collection: this.sections,
			targetSection: targetSection
		});
		this._swapView(view)
	},

	studentsNew: function(){
		var student = new SeatingApp.Models.Student()
		var view = new SeatingApp.Views.StudentsNew({
			model: student,
			collection: this.students
		})
		this._swapView(view)
	},

	studentsIndex: function(){
		this.students.fetch();
		var view = new SeatingApp.Views.StudentsIndexRoot({
			collection: this.students
		})
		this._swapView(view)
	},

	classroomsIndex: function(){
		this.classrooms.fetch()
		var view = new SeatingApp.Views.ClassroomsIndex({
			collection: this.classrooms
		})
		this._swapView(view)
	},

	classroomNew:function() {
		var classroom = new SeatingApp.Models.Classroom()
		var view = new SeatingApp.Views.ClassroomNew({
			model: classroom,
			collection: this.classrooms
		})
		this._swapView(view);
	},

	classroomEdit: function(id){
		var classroom = new SeatingApp.Models.Classroom({ id: id })
		classroom.fetch()
		var view = new SeatingApp.Views.ClassroomForm({
			model: classroom,
			collection: this.classrooms
		})
		this._swapView(view);
	},

	sectionNew: function(){
		this.classrooms.fetch()
		this.students.fetch()
		var section = new SeatingApp.Models.Section()
		var view = new SeatingApp.Views.SectionNew({ model: section,
			students: this.students,
			classrooms: this.classrooms,
			sections: this.sections
		})
		this._swapView(view);
	},

	seatingChartEdit: function(id) {
		var seatingChart = new SeatingApp.Models.SeatingChart({ id: id })
		seatingChart.fetch()
		var view = new SeatingApp.Views.SeatingChartEdit({ model: seatingChart })
		this._swapView(view);
	},

	seatingChartShow: function(id){
		var seatingChart = new SeatingApp.Models.SeatingChart({ id: id })
		seatingChart.fetch()
		var view = new SeatingApp.Views.SeatingChartShow({ model: seatingChart })
		this._swapView(view);
	},

	sectionsIndex: function(){
		this.sections.fetch();
		var view = new SeatingApp.Views.SectionsIndex({ collection: this.sections });
		this._swapView(view)
	},

	_swapView : function(view){
		this._currentView && this._currentView.remove()
		this._currentView = view
		this.$rootEl.html(view.$el)
		view.render();
	}
})