SeatApp.Models.User = Backbone.Model.extend({
	urlRoot: "api/users",

	classrooms: function(){
		parse: function(response){
	    if (response.students){
	      this.students().set(response.students)
	      delete response.students
	    }
	    if (response.classrooms){
	      this.classrooms().set(response.classrooms, { parse: true });
	      delete response.classrooms
	    }
	    return response
		},

	 students: function () {
	    if (!this._students) {
	      this._students = new SeatingApp.Collections.Student();
	    }
	    return this._students;
	  },

	 classrooms: function () {
	    if (!this._classroom) {
	      this._classroom = new SeatingApp.Collections.Classrooms();
	    }
	    return this._classroom;
	  }
	}

})