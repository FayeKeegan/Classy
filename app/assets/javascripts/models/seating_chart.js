SeatingApp.Models.SeatingChart = Backbone.Model.extend({
	urlRoot: "api/seating_charts",

  parse: function (response) {
      if (response.students){
      	this.students().set(response.students)
      	delete response.students
      }
    return response;
  },

  students: function () {
      if (!this._students) {
        this._students = new SeatingApp.Collections.Students([]);
      }
      return this._students;
    }

})