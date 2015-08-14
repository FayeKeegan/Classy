SeatingApp.Routers.Router = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		this.sections = options.sections;
	},

	routes: {
		"": "sectionsIndex",
		"seating_charts/:id/edit": "seatingChartEdit",
		'section/new': "sectionNew",
		"seating_charts/:id": "seatingChartShow"
	},

	sectionNew: function(){
		var section = new SeatingApp.Models.Section({ model: section })
		section.fetch();
		var view = new SeatingApp.Views.SectionNew({ model: section})
		this._swapView(view);
	},

	seatingChartEdit: function(id) {
		var seatingChart = new SeatingApp.Models.SeatingChart({ id: id })
		seatingChart.fetch()
		var view = new SeatingApp.Views.SeatingChartEdit({ model: seatingChart })
		this._swapView(view);
	},

	seatingChartShow: function(id){
		var seatingChart = new SeatingApp.Models.SeatingChart({ id: id })
		seatingChart.fetch()
		var view = new SeatingApp.Views.SeatingChartShow({ model: seatingChart })
		this._swapView(view);
	},

	sectionsIndex: function(){
		this.sections.fetch();
		var view = new SeatingApp.Views.SectionsIndex({ collection: this.sections });
		this._swapView(view)
	},

	_swapView : function(view){
		this._currentView && this._currentView.remove()
		this._currentView = view
		this.$rootEl.html(view.render().$el)
	}
})