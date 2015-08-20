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
    if (response.classroom){
      this.classroom().set(response.classroom).parse(response.classroom)
      delete response.classroom
    }
    if (response.desks){
      this.desks().set(response.desks)
      delete response.desks
    }
  return response;
},

students: function(){
  if (!this._students){
    this._students = new SeatingApp.Collections.Students();
  }
  return this._students;
},

classroom: function(){
  if (!this._classroom){
    this._classroom = new SeatingApp.Models.Classroom();
  }
  return this._classroom;
},

desks: function(){
  if (!this._desks){
    this._desks = new SeatingApp.Collections.Desks();
  }
  return this._desks;
},

seatingCharts: function () {
    if (!this._seatingCharts) {
      this._seatingCharts = new SeatingApp.Collections.SeatingCharts([]);
    }
    return this._seatingCharts;
  }
})