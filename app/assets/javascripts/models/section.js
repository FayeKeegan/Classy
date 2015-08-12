SeatingApp.Models.Section = Backbone.Model.extend({
	urlRoot: "api/sections",

parse: function (response) {
    if (response.seatingCharts){
    	this.seatingCharts().set(response.seatingCharts)
    	delete response.seatingCharts
    }
  return response;
},

seatingCharts: function () {
    if (!this._seatingCharts) {
      this._seatingCharts = new SeatingApp.Collections.SeatingCharts([]);
    }
    return this._seatingCharts;
  }
})