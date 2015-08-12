SeatingApp.Views.SeatingChartsIndex = Backbone.CompositeView.extend({
	template: JST["seating_charts/index"],

	initialize: function(){
		this.listenTo(this.collection, "add", this.addSeatingChartSubview)
		this.collection.each(this.addSeatingChartSubview.bind(this))
		this.addNewChartSubview();
	},

	addSeatingChartSubview: function(seatingChart){
		var seatingChartSubview = new SeatingApp.Views.SeatingChartIndexItem({ model: seatingChart });
		this.addSubview("ul.seating-charts-index", seatingChartSubview)
	},

	render: function() {
		var content = this.template({ seating_charts: this.collection });
		this.$el.html(content);
		return this;
	},

	addNewChartSubview: function(){
		var newChartSubview = new SeatingApp.Views.NewChart({ model: seatingChart });
		this.addSubview("ul.seating-charts-index", seatingChartSubview)
	},
})