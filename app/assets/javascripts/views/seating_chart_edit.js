SeatingApp.Views.SeatingChartEdit = Backbone.CompositeView.extend({
	template: JST["seating_charts/edit"],

	events: {
		"click .save-chart-button": "saveChart",
		"click .delete-chart-button" : "deleteSeatingChart",
		"click .edit-chart-button" : "editSeatingChart",
		"click .shuffle-students-button" : "shuffleUnassignedStudents",
	},

	shuffleUnassignedStudents: function(e){
		var view = this;
		e.preventDefault()
		var unassignedStudents = $(".student-icon-draggable:not(.student-icon-assigned)")
		var emptyDesks = $(".desk.info");
		while (unassignedStudents.length > 0){
			var deskDiv = emptyDesks.splice(Math.floor(Math.random() * emptyDesks.length), 1)[0]
			var studentDiv = unassignedStudents.splice(Math.floor(Math.random() * unassignedStudents.length), 1)[0]
			var deskId = $(deskDiv).attr("desk-id");
			var studentId = $(studentDiv).attr("student-id");
			var seatAssignment = new SeatingApp.Models.SeatAssignment({
	      		seating_chart_id: this.model.id,
	      		student_id: studentId,
	      		desk_id: deskId
	      	});
			seatAssignment.save();
			}
		this.render();
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

	editSeatingChart: function(e){
		e.preventDefault();
		Backbone.history.navigate("seating_charts/" + this.model.id + "/edit", { trigger: true } )
	},

	deleteSeatingChart: function(e){
		e.preventDefault();
		this.model.destroy({
			success: function(){
				Backbone.history.navigate("", { trigger: true })
			}.bind(this)
		})
	},
	
	render: function(){
		var content = this.template({ seatingChart: this.model });
		this.$el.html(content);
		this.attachSubviews();
		this.addGridToPage();
		this.placeAssignedStudents();
		this.onRender();
		return this;
	},

	placeAssignedStudents: function(){
		this.model.seatAssignments().each(function(seatAssignment){
			var deskId = seatAssignment.get("desk_id")
			var studentId = seatAssignment.get("student_id")
			var student = this.model.students().get(studentId)
			var draggableStudent = $("[student-id=" + studentId + "].student-icon-draggable")[0]
			var droppableDesk = $("[desk-id=" + deskId + "].desk")

			droppableDesk.append(draggableStudent);
			$(droppableDesk).removeClass("info").addClass("success");
			var nameDiv = $("<div>")
				.addClass("desk-label")
				.text(student.get("first_name"))
			$(draggableStudent)
				.css({ top: 0, left: 0})
				.addClass("student-icon-assigned")
				.attr("seat-assignment-id", seatAssignment.id)
				.attr("assigned-desk-id", deskId)
				.addClass("student-icon-dragged")
				.append(nameDiv)
		}.bind(this))
	},


	
	onRender: function () {
		var seatingChart = this.model
    $(".student-icon-draggable").draggable({
    	start: function(event, ui){
    		var $draggable= $(this)
    		var studentId = $(this).attr("student-id")
    		var student = seatingChart.students().get(studentId)
    		if (this.children.length < 1){
    			var nameDiv = $("<div>")
						.addClass("desk-label")
						.text(student.get("first_name"))
					$(this).append(nameDiv)
    		}
    		$(this).addClass("student-icon-dragging").addClass("student-icon-dragged")
    		if ( $(this).hasClass("student-icon-assigned") ){
    			$(this).removeClass("student-icon-assigned")
    			var seatAssignmentId = $(this).attr("seat-assignment-id")
    			var seatAssignment = seatingChart.seatAssignments().getOrFetch(seatAssignmentId)
    			// $(this).draggable("option", "revert", true)
    			var desk = $("[desk-id=" + $(this).attr("assigned-desk-id") + "]")
    			seatAssignment.destroy({
    				success: function(){
    					desk.removeClass("success").addClass("info")
    				}
    			});
    		}
    	},
    	stop: function(event, ui){
    		$(this).removeClass("student-icon-dragging")
    	},
    	stack: ".student-icon-draggable"
    });
    $(".desk").droppable({
    	out: function(event, ui){   
    		$(this).removeClass("danger") 		
    	},

    	over: function(event, ui){
    		if ($(this).children().attr("assigned-desk-id") === $(this).attr("desk-id")) {
    			$(this).addClass("danger")
    		}
    	},

      drop: function( event, ui ) {
      	if ($(this).children().attr("assigned-desk-id") === $(this).attr("desk-id")) {
    			$(this).addClass("danger")
    		} else {
	      	var that = this;
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
		      			var student = ui.draggable
		      			student.appendTo($(that))
		      			$(student).css({top: 0, left: 0})
		      			desk_div.removeClass("info")
		      			desk_div.addClass("success")
		      			seatingChart.seatAssignments().add(seatAssignment)
		      			ui.draggable.removeClass("unassigned").addClass("student-icon-assigned")
		      			ui.draggable.attr("assigned-desk-id", desk_id)
		      			ui.draggable.attr("seat-assignment-id", seatAssignment.id)
		      		}
		      	})
	      	}
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
		var view = new SeatingApp.Views.StudentIndexItemDraggable({ model: student })
		this.addSubview("#students-table", view)
	}
})