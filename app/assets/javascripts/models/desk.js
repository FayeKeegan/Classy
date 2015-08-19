SeatingApp.Models.Desk = Backbone.Model.extend({
	urlRoot: "api/desks",

	parse: function (response) {
    if (response.seatAssignments){
    	this.seatAssignments().set(response.seatAssignments, { parse: true })
    	delete response.seatAssignments
    }
    return response;
  },

  seatAssignments: function () {
    if (!this._seatAssignments) {
      this._seatAssignments = new SeatingApp.Collections.SeatAssignments();
    }
    return this._seatAssignments;
  }

})