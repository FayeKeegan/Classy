SeatingApp.Models.SeatAssignment = Backbone.Model.extend({
	urlRoot: "api/seat_assignments",

	parse: function(response){
    if (response.student){
      this.student().set(response.student)
      delete response.student
    }
    if (response.desk){
      this.desk().set(response.desk);
      delete response.desk
    }
    return response
	},

 student: function () {
    if (!this._student) {
      this._student = new SeatingApp.Models.Student();
    }
    return this._student;
  },

 desk: function () {
    if (!this._desk) {
      this._desk = new SeatingApp.Models.Desk();
    }
    return this._desk;
  }
})