SeatingApp.Collections.Sections = Backbone.Collection.extend({
	url: "api/sections",

	model: SeatingApp.Models.Section,

	comparator: function(section){
		return -Date.parse(section.get("updated_at"));
	},

	getOrFetch: function(id){
		var section = this.get(id)
		if (!section){
			section = new SeatingApp.Models.Section({ id: id })
			this.add(section)
		}
		section.fetch();
		return section;
	}
})