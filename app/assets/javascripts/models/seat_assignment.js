SeatingApp.Models.SeatAssignment = Backbone.Model.extend({
	urlRoot: "api/seat_assignments",

	parse: function(response){
    if (response.student){
      this.student().set(response.student);
      delete response.student;
    }
    if (response.desk){
      this.desk().set(response.desk);
      delete response.desk;
    }
    if (response.seatingChart){
      this.seatingChart().set(response.seatingChart);
      delete response.seatingChart;
    }
    return response;
	},

  seatingChart: function () {
    if (!this._seatingChart) {
      this._seatingChart = new SeatingApp.Models.SeatingChart();
    }
    return this._seatingChart;
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