SeatingApp.Views.ClassroomShowSmall = Backbone.View.extend({
	template: JST["classrooms/show_small"],

	initialize: function(){
		this.render()
	},

	render: function () {
    var content = this.template()
    this.$el.html(content);
    this.addGridToPage();
    return this;
  },

	addDesksToGrid: function(){
		this.model.desks().each(function(desk){
			var row = desk.get('row');
			var col = desk.get('column');
			var desk_id = desk.get("id")
			var occupied_square = this.$("td[row-num='" + row + "'][col-num='" + col +  "']")
			occupied_square.addClass("info").addClass("desk-small")
		}.bind(this))
	},

	addGridToPage: function(){
		for (var i = 0; i < this.model.get("height"); i++) {
			var row = $("<tr>").addClass("classroom_row_preview")
			this.$(".classroom-grid-small").append(row)
			for (var j = 0; j < this.model.get("width"); j++) {
				var cell = $("<td>").addClass("classroom_square_preview").attr("row-num", i).attr("col-num", j)
				row.append(cell)
			}
		}
		this.addDesksToGrid();
	}
})