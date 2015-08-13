SeatingApp.Collections.Desks = Backbone.Collection.extend({
	url: "api/desks",

	model: SeatingApp.Models.Desk,
	
	getOrFetch: function(id){
		var desks = this.get(id)
		if (!desks){
			desks = new SeatingApp.Models.Desks({ id: id })
			this.add(desks)
		}
		desks.fetch();
		return desks;
	}
})