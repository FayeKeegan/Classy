SeatingApp.Models.SeatingChart = Backbone.Model.extend({
	urlRoot: "api/seating_charts",

  parse: function (response) {
      if (response.students){
      	this.students().set(response.students)
      	delete response.students
      }
      if (response.classroom){
        this.classroom().set(response.classroom)
        delete response.classroom
      }
      if (response.desks){
        this.desks().set(response.desks)
        delete response.desks
      }
    return response;
  },

  desks: function () {
      if (!this._desks) {
        this._desks = new SeatingApp.Collections.Desks([]);
      }
      return this._desks;
    },

  classroom: function () {
      if (!this._classroom) {
        this._classroom = new SeatingApp.Models.Classroom();
      }
      return this._classroom;
    },

  students: function () {
      if (!this._students) {
        this._students = new SeatingApp.Collections.Students([]);
      }
      return this._students;
    }

})