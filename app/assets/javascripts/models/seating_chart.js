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
      if (response.seatAssignments){
        this.seatAssignments().set(response.seatAssignments, {parse: true})
        delete response.seatAssignments
      }
      if (response.section){
        this.section().set(response.section)
        delete response.section
      }
    return response;
  },

 section: function () {
    if (!this._section) {
      this._section = new SeatingApp.Models.Section();
    }
    return this._section;
  },

  seatAssignments: function () {
      if (!this._seatAssignments) {
        this._seatAssignments = new SeatingApp.Collections.SeatAssignments([]);
      }
      return this._seatAssignments;
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