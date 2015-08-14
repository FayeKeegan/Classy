SeatingApp.Models.Classroom = Backbone.Model.extend({
	urlRoot: "api/classrooms",

  parse: function (response) {
    if (response.desks){
    	this.desks().set(response.desks)
    	delete response.desks
    }
    return response;
  },

  desks: function () {
    if (!this._desks) {
      this._desks = new SeatingApp.Collections.Desks();
    }
    return this._desks;
  }
})