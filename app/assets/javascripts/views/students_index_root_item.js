SeatingApp.Views.StudentsIndexRootItem = Backbone.View.extend({
	template: JST["students/index_root_item"],

	initialize: function(){
		this.listenTo(this.model, "sync remove", this.render)
	},

	tagName: "tr",

	render: function(){
		var content = this.template({ student: this.model })
		this.$el.html(content);
		return this;
	}
})