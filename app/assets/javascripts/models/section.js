SeatingApp.Models.Section = Backbone.Model.extend({
	urlRoot: "api/sections",

parse: function (response) {
    if (response.seatingCharts){
    	this.seatingCharts().set(response.seatingCharts)
    	delete response.seatingCharts
    }
    if (response.students){
      this.students().set(response.students)
      delete response.students
    }
  return response;
},

students: function(){
  if (!this._students){
    this._students = new SeatingApp.Collections.Students();
  }
  return this._students;
},

seatingCharts: function () {
    if (!this._seatingCharts) {
      this._seatingCharts = new SeatingApp.Collections.SeatingCharts([]);
    }
    return this._seatingCharts;
  }
})