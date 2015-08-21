SeatingApp.Models.Classroom = Backbone.Model.extend({
	urlRoot: "api/classrooms",

  parse: function (response) {
    if (response.desks){
    	this.desks().set(response.desks, { parse: true });
    	delete response.desks;
    }
    if (response.seatingCharts){
      this.seatingCharts().set(response.seatingCharts);
      delete response.seatingCharts;
    }
    if (response.sections){
      this.sections().set(response.sections);
      delete response.sections;
    }
    return response;
  },

  sections: function () {
    if (!this._sections) {
      this._sections = new SeatingApp.Collections.Sections();
    }
    return this._sections;
  },
  
  seatingCharts: function () {
    if (!this._seatingCharts) {
      this._seatingCharts = new SeatingApp.Collections.SeatingCharts();
    }
    return this._seatingCharts;
  },

  desks: function () {
    if (!this._desks) {
      this._desks = new SeatingApp.Collections.Desks();
    }
    return this._desks;
  }
})