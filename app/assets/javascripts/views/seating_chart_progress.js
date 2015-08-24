SeatingApp.Views.SeatingChartProgress = Backbone.View.extend({
	template: JST["seating_charts/progress_bar"],

	tagName: "div",

	className: "progress progress-striped active",

	initialize: function(options){
		this.students = options.students;
		this.seatAssignments = options.seatAssignments;
		this.listenTo(this.seatAssignments, "add remove change", this.render)
	},

	percentSeated: function(){
		if (this.seatAssignments.length > 0){
			return Math.round((this.seatAssignments.length / this.students.length) * 100)
		} else {
			return 0;
		}
	},

	render: function(){
		var pct = this.percentSeated();
		var givenClass = pct === 100 ? "progress-bar-success" : "progress-bar-info"
		var content = this.template({
			pct: pct,
			givenClass: givenClass
		})
		this.$el.html(content);
		return this;
	}

})