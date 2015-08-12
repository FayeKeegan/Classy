SeatingApp.Views.StudentsIndex = Backbone.View.extend({
	template: JST["students/index"],

	initialize: function(){
		this.listenTo(this.collection, "sync", this.render)
	},

	render: function(){
		var content = this.template({ students: this.collection })
		this.$el.html(content);
		return this;
	}
})