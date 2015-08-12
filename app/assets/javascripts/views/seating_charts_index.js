SeatingApp.Views.SeatingChartsIndex = Backbone.View.extend({
	template: JST["seating_charts/index"],

	initialize: function(){
		this.listenTo(this.collection, "sync", this.render)
	},

	render: function() {
		var content = this.template({ seating_charts: this.collection });
		this.$el.html(content);
		return this;
	}
})