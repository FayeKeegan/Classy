SeatingApp.Views.ClassroomEdit= Backbone.CompositeView.extend({
	template: JST["classrooms/edit"],

	events: {
		"mouseenter .student-index-item": "highlightDesk",
		"mouseleave .student-index-item": "unHighlightDesk",
		"click .classroom-square.desk": "destroyDesk",
		"click .classroom-square:not(.desk)": "createDesk"
	},

	destroyDesk: function(e){
		var $desk = $(e.currentTarget);
		var desk_id = $desk.attr("desk-id");
		var desk = new SeatingApp.Models.Desk({ id: desk_id });
		desk.destroy({
			success: function(){
				$desk.removeClass("info desk").removeAttr("desk-id");
				this.model.desks().remove(desk);
			}.bind(this)
		})
	},

	createDesk: function(e){
		var $desk = $(e.currentTarget);
		var desk_row = $desk.attr("row-num");
		var desk_col = $desk.attr("col-num");
		var classroom_id = this.model.id;
		var desk = new SeatingApp.Models.Desk({
			row: desk_row,
			column: desk_col,
			classroom_id: classroom_id
		})
		desk.save({},{
			success: function(desk){
				$desk.addClass("info desk").attr("desk-id", desk.id);
				this.model.desks().remove(desk);
			}.bind(this)
		})
	},

	highlightDesk: function(e) {

	},

	unHighlightDesk: function(e) {

	},

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
	},
	
	render: function(){
		var content = this.template({ classroom: this.model });
		this.$el.html(content);
		this.attachSubviews();
		this.addGridToPage();
		return this;
	},

	addDesksToGrid: function(){
		this.model.desks().each(function(desk){
			var row = desk.get('row');
			var col = desk.get('column');
			var desk_id = desk.get("id")
			var occupied_square = $("td[row-num='" + row + "'][col-num='" + col +  "']")
			occupied_square.addClass("info").addClass("desk").attr("desk-id", desk_id)
		})
	},

	addGridToPage: function(){
		for (var i = 0; i < this.model.get("height"); i++) {
			var row = $("<tr>").addClass("classroom-row")
			var find = $("#classroom-grid")
			$("#classroom-grid").append(row)
			for (var j = 0; j < this.model.get("width"); j++) {
				var cell = $("<td>").addClass("classroom-square").attr("row-num", i).attr("col-num", j)
				row.append(cell)
			}
		}
		this.addDesksToGrid();
	}
})