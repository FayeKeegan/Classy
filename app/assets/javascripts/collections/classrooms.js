SeatingApp.Collections.Classrooms = Backbone.Collection.extend({
	url: "api/classrooms",

	model: SeatingApp.Models.Classroom,
	
	getOrFetch: function(id){
		var classroom = this.get(id)
		if (!classroom){
			classroom = new SeatingApp.Models.Classroom({ id: id })
			this.add(classroom)
		}
		classroom.fetch();
		return classroom;
	}
})