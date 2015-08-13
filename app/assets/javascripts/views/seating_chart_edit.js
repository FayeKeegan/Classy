SeatingApp.Views.SeatingChartEdit = Backbone.CompositeView.extend({
	template: JST["seating_charts/edit"],

	events: {
	},


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
		this.onRender();
		return this;
	},

	onRender: function () {
		var seatingChart = this.model
    $(".student-icon-draggable").draggable({
    	start: function(event, ui){
    		$(this).addClass("student-icon-dragging")
    	},
    	stop: function(event, ui){
    		$(this).removeClass("student-icon-dragging")
    		if ( $(this).hasClass("assigned") ){
    			$(this).removeClass("assigned")
    			var seatAssignmentId = $(this).attr("seat-assignment-id")
    			var seatAssignment = seatingChart.seatAssignments().getOrFetch(seatAssignmentId)
    			seatAssignment.destroy();
    		}
    	},
    	appendTo: "body",
    	snap: ".desk",
    	stack: ".student-icon-draggable"
    });
    $(".desk").droppable({
      drop: function( event, ui ) {
      	var desk_id = $(event.target).attr("desk-id")
      	var student_id = $(ui.draggable).attr("student-id")
      	var seating_chart_id = seatingChart.id
      	var seatAssignment = new SeatingApp.Models.SeatAssignment({
      		seating_chart_id: seating_chart_id,
      		student_id: student_id,
      		desk_id: desk_id
      	})
      	var student = seatingChart.students().getOrFetch(student_id)
      	seatAssignment.save({},{
      		success: function(){
      			seatingChart.seatAssignments().add(seatAssignment)
      			$(event.target).addClass("occupied")
      			$(event.target).text(student.get("first_name"))
      			$(ui.draggable).removeClass("unassigned").addClass("assigned")
      			$(ui.draggable).attr("seat-assignment-id", seatAssignment.id)
      		}
      	})
      }
    });
	},

	addDesksToGrid: function(){
		this.model.desks().each(function(desk){
			var row = desk.get('row');
			var col = desk.get('column');
			var desk_id = desk.get("id")
			var occupied_square = $("td[row-num='" + row + "'][col-num='" + col +  "']")
			occupied_square.addClass("info desk").attr("desk-id", desk_id)
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
		this.addSubview("#students-table", view)
	}
})