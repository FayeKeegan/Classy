SeatingApp.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.seatingCharts = options.seatingCharts;
	},

	routes: {
		"": "seatingChartsIndex"
	},

	seatingChartsIndex: function(){
		this.seatingCharts.fetch();
		var view = new SeatingApp.Views.SeatingChartsIndex({collection: this.seatingCharts})
		this._swapView(view);
	},

	_swapView : function(view){

		this._currentView && this._currentView.remove()
		this._currentView = view
		this.$rootEl.html(view.render().$el)
	}
})