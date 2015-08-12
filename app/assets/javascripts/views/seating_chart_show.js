SeatingApp.Views.SeatingChartShow = Backbone.CompositeView.extend({
	template: JST["seating_charts/show"],

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
		this.model.students().each(this.addStudentIndexItem.bind(this))
		this.listenTo(this.model.students(), "add", this.addStudentIndexItem.bind(this))
	},
	
	render: function(){
		var content = this.template({ seatingChart: this.model })
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	addStudentIndexItem: function(student){
		var view = new SeatingApp.Views.StudentIndexItem({ model: student })
		this.addSubview("#students-index", view)
	}
})