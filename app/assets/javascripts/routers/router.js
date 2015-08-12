SeatingApp.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.sections = options.sections;
	},

	routes: {
		"": "sectionsIndex",
		"seating_chart/:id": "seatingChartShow"
	},

	sectionsIndex: function(){
		this.sections.fetch();
		var view = new SeatingApp.Views.SectionsIndex({ collection: this.sections });
		this._swapView(view)
	},

	seatingChartsIndex: function(){
		// this.seatingCharts.fetch();
		// var view = new SeatingApp.Views.SeatingChartsIndex({collection: this.seatingCharts})
		// this._swapView(view);
	},

	_swapView : function(view){
		this._currentView && this._currentView.remove()
		this._currentView = view
		this.$rootEl.html(view.render().$el)
	}
})