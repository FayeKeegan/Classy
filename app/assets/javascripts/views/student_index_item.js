SeatingApp.Views.StudentIndexItem = Backbone.View.extend({
	template: JST["students/index_item"],

	className: "student-index-item",

	tagName: "tr",

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
	},

	render: function(){
		var content = this.template({ student: this.model })
		this.$el.html(content);
		return this;
	}
})