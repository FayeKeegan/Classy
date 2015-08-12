SeatingApp.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.seatingCharts = opttons.seatingCharts
	},

	routes: {
		"/": "seatingChartsIndex"
	},

	seatingChartsIndex: function(){
		var view = new SeatingApp.Views.new
	},

	_swapView : function(view){
		this._currentView && this._currentView.remove()
		this._currentView = view
		this.$rootEl.html(view.render().$el)
	}


})