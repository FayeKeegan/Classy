SeatingApp.Views.SectionIndexItem = Backbone.CompositeView.extend({
	template: JST["sections/index_item"],
	className: "row",

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
		this.model.seatingCharts().each(this.addSeatingChartIndexItem.bind(this))
		this.listenTo(this.model.seatingCharts(), "add", this.addSeatingChartIndexItem.bind(this))
		this.listenTo(this.model.seatingCharts(), "add", this.addChartNewSubview.bind(this))
		this.listenTo(this.model, "sync", this.render)
		this.addChartNewSubview();
		this.listenTo(this.model.seatingCharts(), "remove", this.render)
	},

	events: {
		"click .create-seatingChart" : "createSeatingChart",
	},

	createSeatingChart: function(e){
		e.preventDefault();
		var view = this;
		var seatingChartData = $(e.delegateTarget).find(".new-seating-chart-form").serializeJSON()
		var seatingChart = new SeatingApp.Models.SeatingChart(seatingChartData)
		seatingChart.set({ section_id: this.model.id })
		seatingChart.save({},{
			success: function(){
				view.chartNewSubview.remove()
				view.model.seatingCharts().add(seatingChart);
			}
		})
	},

	render: function(){
		var content = this.template(({section: this.model }))
		this.$el.html(content)
		this.attachSubviews();
		return this
	},

	addSeatingChartIndexItem: function(seatingChart){
		var view = new SeatingApp.Views.SeatingChartIndexItem({ model: seatingChart})
		this.addSubview("#seating-charts-index", view)
	},

	addChartNewSubview: function(){
		var seatingChart = new SeatingApp.Models.SeatingChart()
		this.chartNewSubview = new SeatingApp.Views.SeatingChartNew({ model: seatingChart });
		this.addSubview("#seating-charts-index", this.chartNewSubview)
	}
})