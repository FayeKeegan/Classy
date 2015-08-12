SeatingApp.Views.SectionIndexItem = Backbone.View.extend({
	template: JST["sections/index_item"],

	initialize: function(){
		this.model.fetch();
		this.listenTo(this.model, "sync", this.render)
	},

	render: function(){
		var content = this.template()
		this.html(content)
		return this
	}
})