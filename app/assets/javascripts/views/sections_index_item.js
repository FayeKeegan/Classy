SeatingApp.Views.SectionIndexItem = Backbone.CompositeView.extend({
	template: JST["sections/index_item"],
	className: "row",

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
		this.model.seatingCharts().each(this.addSeatingChartIndexItem.bind(this))
		this.listenTo(this.collection, "add", this.addSeatingChartIndexItem)
		this.listenTo(this.model, "sync", this.render)
	},

	addSeatingChartIndexItem: function(seatingChart){
		var view = new SeatingApp.Views.SeatingChartIndexItem({ model: seatingChart })
		this.addSubview("#seating-charts-index", view)
	},

	render: function(){
		var content = this.template(({section: this.model }))
		this.$el.html(content)
		return this
	}
})