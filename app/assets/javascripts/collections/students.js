SeatingApp.Collections.Students = Backbone.Collection.extend({
	url: "api/students",

	model: SeatingApp.Models.Student,

	getOrFetch: function(id){
		var student = this.get(id)
		if (!student){
			student = new SeatingApp.Models.Student({ id: id })
			this.add(student)
		}
		student.fetch();
		return student;
	}

})