SeatingApp.Views.SeatingChartsIndex = Backbone.CompositeView.extend({
	template: JST["seating_charts/index"],

	initialize: function(){
		this.listenTo(this.collection, "add", this.addSeatingChartSubview)
		this.collection.each(this.addSeatingChartSubview.bind(this));
		this.addChartNewSubview();
	},

	addSeatingChartSubview: function(seatingChart){
		var seatingChartSubview = new SeatingApp.Views.SeatingChartIndexItem({ model: seatingChart });
		this.addSubview("ul.seating-charts-index", seatingChartSubview)
	},

	render: function() {
		var content = this.template({ seating_charts: this.collection });
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	addChartNewSubview: function(){
		var seatingChart = new SeatingApp.Models.SeatingChart()
		var chartNewSubview = new SeatingApp.Views.SeatingChartNew({ model: seatingChart });
		this.addSubview("ul.seating-charts-index", chartNewSubview)
	}
})