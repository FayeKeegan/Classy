SeatingApp.Collections.SeatAssignments = Backbone.Collection.extend({
	url: "api/seat_assignments",

	model: SeatingApp.Models.SeatAssignment,

	getOrFetch: function(id){
		var seatAssignment = this.get(id)
		if (!seatAssignment){
			seatAssignment = new SeatingApp.Models.SeatAssignment({ id: id })
			this.add(seatAssignment)
		}
		seatAssignment.fetch();
		return seatAssignment;
	}

})