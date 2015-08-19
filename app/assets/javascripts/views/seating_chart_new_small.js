SeatingApp.Views.SeatingChartNewSmall = Backbone.CompositeView.extend({
	template: JST["seating_charts/new_small"],

	events: {
		"mouseenter .panel" : "higlightPanel",
		"mouseleave .panel" : "unhiglightPanel",
		"click .panel" : "newSeatingChartForm",
		"click .create-seating-chart-button": "newSeatingChartModal",
		"mouseenter .classroom_square_preview.desk-small" : "highlightDesk",
		"mouseleave .classroom_square_preview.desk-small" : "unhighlightDesk"
	},


	className: "col col-lg-3 new-seating-chart",

	initialize: function(options){
		this.section = options.section;
		this.addClassroomPreview();
	},

	unhighlightDesk: function(e){
		$(e.currentTarget).removeClass("success").addClass("info")
	},


	highlightDesk: function(e){
		$(e.currentTarget).removeClass("info").addClass("success")
	},


	newSeatingChartModal: function(e){
		e.preventDefault();
		var seatingChart = new SeatingApp.Models.SeatingChart({
			section_id: this.section.id
		})
		var newSeatingChartModal = new SeatingApp.Views.SeatingChartNewModal({
			model: seatingChart,
			collection: this.collection,
		})
		$('body').append(newSeatingChartModal.$el);
		newSeatingChartModal.render()
	},


	higlightPanel: function(e) {
		this.$(".active").removeClass("active").addClass("info")
		this.$(".panel.new-seating-chart-panel").removeClass("new-seating-chart-panel");
		this.$(".panel-heading.new-seating-chart-panel-header").removeClass("new-seating-chart-panel-header")
	},

	unhiglightPanel: function(e){
		this.$(".info").removeClass("info").addClass("active")
		this.$(".panel").addClass("new-seating-chart-panel");
		this.$(".panel-heading").addClass("new-seating-chart-panel-header");
	},

	addClassroomPreview: function(){
		var view = new SeatingApp.Views.ClassroomShowSmall({
			model: this.section
		})
		this.addSubview(".classroom-preview", view);
	},

	render: function(){
		var content = this.template({ seatingChart: this.model });
		this.$el.html(content);
		this.attachSubviews();
		this.$(".info").removeClass("info").addClass("active")
		return this;
	}
})