SeatingApp.Views.SeatingChartShow = Backbone.CompositeView.extend({
	template: JST["seating_charts/show"],

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
		this.model.students().each(this.addStudentIndexItem.bind(this))
		this.listenTo(this.model.students(), "add", this.addStudentIndexItem.bind(this))
	},
	
	render: function(){
		var content = this.template({ seatingChart: this.model });
		this.$el.html(content);
		this.attachSubviews();
		this.addGridToPage();
		return this;
	},

	addDesksToGrid: function(){

		this.model.desks().each(function(desk){
			var row = desk.get('row');
			var col = desk.get('column');
			var occupied_square = $("td[row-num='" + row + "'][col-num='" + col +  "']")
			occupied_square.addClass("occupied");
		})
	},

	addGridToPage: function(){
		for (var i = 0; i < this.model.classroom().get("height"); i++) {
			var row = $("<tr>").addClass("classroom-row")
			var find = $("#classroom-grid")
			$("#classroom-grid").append(row)
			for (var j = 0; j < this.model.classroom().get("width"); j++) {
				var cell = $("<td>").addClass("classroom-square").attr("row-num", i).attr("col-num", j)
				row.append(cell)
			}
		}
		this.addDesksToGrid();
	},

	addClassroomShowSubview: function(){
		var view = new SeatingApp.Views.ClassroomShow({ model:this.model.classroom()})
		
	},

	addStudentIndexItem: function(student){
		var view = new SeatingApp.Views.StudentIndexItem({ model: student })
		this.addSubview("#students-index", view)
	}
})