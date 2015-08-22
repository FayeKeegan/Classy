SeatingApp.Views.SectionIndexItem = Backbone.CompositeView.extend({
	template: JST["sections/index_item"],
	className: "row",

	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.desks().seatingCharts, "change", this.render)
		this.model.seatingCharts().each(this.addSeatingChartIndexItem.bind(this));
		this.listenTo(this.model.seatingCharts(), "add", this.addSeatingChartIndexItem.bind(this));
		this.listenTo(this.model.seatingCharts(), "add", this.addChartNewSubview.bind(this));
		this.listenTo(this.model.seatingCharts(), "remove", this.removeSeatingChartIndexItem);
		this.listenTo(this.model, "sync", this.render);
		this.addChartNewSubview();
	},

	events: {
		"submit .new-seating-chart" : "createSeatingChart",
		"mouseenter #seating-chart-index-item" : "seatingChartHighlight",
		"mouseleave #seating-chart-index-item" : "seatingChartUnhighlight",
		"mouseenter #new-seating-chart-index-item" : "seatingChartHighlight",
		"mouseleave #new-seating-chart-index-item" : "seatingChartUnhighlight",
		"mouseenter .section-header": "showDeleteButton",
		"mouseleave .section-header": "hideDeleteButton",
		"click .destroy-section": "destroySectionModal"
	},

	destroySectionModal: function(e){
		e.preventDefault();
		debugger
		var destroyModal = new SeatingApp.Views.SectionDestroyModal({
			model: this.model
		})
		$('body').append(destroyModal.$el);
		destroyModal.$el.children().css({"position":"fixed"});
		destroyModal.render();
	},


	showDeleteButton: function(e){
		e.preventDefault();
		var destroyButton = $(e.target).find(".destroy-section")[0];
		$(destroyButton).css({"display": "inline"});
	},

	hideDeleteButton: function(e){
		e.preventDefault();
		var destroyButton = $(e.target).find(".destroy-section")[0];
		$(destroyButton).css({"display": "none"});
	},


	removeSeatingChartIndexItem: function(seatingChart){
		this.removeModelSubview("#seating-charts-index", seatingChart);
	},

	seatingChartHighlight: function (e){
		$(e.currentTarget).removeClass("panel-primary").addClass("panel-info");
	},

	seatingChartUnhighlight: function (e){
		$(e.currentTarget).removeClass("panel-info").addClass("panel-primary");
	},

	createSeatingChart: function(e){
		e.preventDefault();
		var view = this;
		var seatingChartData = $(e.delegateTarget).find(".new-seating-chart-form").serializeJSON();
		var seatingChart = new SeatingApp.Models.SeatingChart(seatingChartData);
		seatingChart.set({ section_id: this.model.id });
		seatingChart.save({},{
			success: function(){
				view.model.seatingCharts().add(seatingChart);
				Backbone.history.navigate("/seating_charts/"+ seatingChart.id + "/edit", { trigger: true })
			}
		})
	},

	render: function(){
		var content = this.template(({
			section: this.model,
			classroom: this.model.classroom()
		}));
		this.$el.html(content);
		this.attachSubviews();
		return this
	},

	addSeatingChartIndexItem: function(seatingChart){
		var view = new SeatingApp.Views.SeatingChartIndexItem({
			model: seatingChart,
			collection: this.model.seatingCharts(),
			classroom: this.model.classroom()
		})
		this.addSubview("#seating-charts-index", view);
	},

	addChartNewSubview: function(){
		var seatingChart = new SeatingApp.Models.SeatingChart();
		this.chartNewSubview = new SeatingApp.Views.SeatingChartNewSmall({
			model: seatingChart,
			section: this.model,
			collection: this.model.seatingCharts(),
			classroom: this.model.classroom()
		});
		this.addSubview("#seating-charts-index", this.chartNewSubview);
	}
})