SeatingApp.Views.SeatingChartEdit = Backbone.CompositeView.extend({
	template: JST["seating_charts/edit"],

	events: {
		"click .save-chart-button": "saveChart"
	},

	saveChart: function(e){
		e.preventDefault();
		Backbone.history.navigate("", { trigger: true })
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
    		var studentId = $(this).attr("student-id")
    		var student = seatingChart.students().get(studentId)
    		$(this).text(student.get("first_name"))
    		$(this).addClass("student-icon-dragging").addClass("student-icon-dragged")
    		if ( $(this).hasClass("student-icon-assigned") ){
    			$(this).removeClass("student-icon-assigned")
    			var seatAssignmentId = $(this).attr("seat-assignment-id")
    			var seatAssignment = seatingChart.seatAssignments().getOrFetch(seatAssignmentId)
    			seatAssignment.destroy();
    		}
    	},
    	stop: function(event, ui){
    		$(this).removeClass("student-icon-dragging")
    	},
    	appendTo: "body",
    	stack: ".student-icon-draggable"
    });
    $(".desk").droppable({
    	out: function(event){
    		$(event.target).removeClass("success").addClass("info")
    	},
      drop: function( event, ui ) {
      	var desk_div = $(event.target)
      	var desk_id = $(event.target).attr("desk-id")
      	var student_id = $(ui.draggable).attr("student-id")
      	var seating_chart_id = seatingChart.id
      	var seatAssignment = new SeatingApp.Models.SeatAssignment({
      		seating_chart_id: seating_chart_id,
      		student_id: student_id,
      		desk_id: desk_id
      	})
      	var student = seatingChart.students().get(student_id)
      	seatAssignment.save({},{
      		success: function(){
      			desk_div.removeClass("info")
      			desk_div.addClass("success")
      			seatingChart.seatAssignments().add(seatAssignment)
      			ui.draggable.removeClass("unassigned").addClass("student-icon-assigned")
      			ui.draggable.attr("seat-assignment-id", seatAssignment.id)
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