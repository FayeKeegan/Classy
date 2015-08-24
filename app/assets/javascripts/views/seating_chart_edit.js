SeatingApp.Views.SeatingChartEdit = Backbone.CompositeView.extend({
	template: JST["seating_charts/edit"],

	events: {
		"click .save-chart-button": "saveChart",
		"click .delete-chart-button" : "deleteSeatingChart",
		"click .edit-chart-button" : "editSeatingChart",
		"click .shuffle-students-button" : "shuffleUnassignedStudents",
		"click .show-math-level-button": "showMathLevel",
		"click .show-reading-level-button": "showReadingLevel",
		"click .remove-level-button": "hideLevels",
		"click .start-over-button": "detachAllStudents"
	},

	hideLevels: function(){
		$(".student-icon-draggable").each(function(i, student_icon){
			$(student_icon).removeClass("level1 level2 level3 level4 level5");
			var label = $(student_icon).children().detach();
			$(student_icon).removeClass("level1 level2 level3 level4 level5").text("");
			$(student_icon).append(label);
		})
	},

	showLevel: function(category){
		$(".student-icon-draggable").each(function(i, student_icon){
			var id = $(student_icon).attr("student-id");
			var level_num = this.model.students().get(id).get(category);
			var label = $(student_icon).children().detach();
			$(student_icon).removeClass("level1 level2 level3 level4 level5");
			$(student_icon).addClass("level" + level_num).text(level_num);
			$(student_icon).append(label);
		}.bind(this))
	},

	showMathLevel: function(){
		this.showLevel("math_level");
	},

	showReadingLevel: function(){
		this.showLevel("reading_level");
	},

	appendOrangeAlert: function(body){
		$("#alerts").empty();
		var alert = new SeatingApp.Views.OrangeAlert({
				body: body
			});
		alert = alert.render().$el;
		$("#alerts").html(alert);
	},

	shuffleUnassignedStudents: function(e){
		var seatingChart = this.model
		var view = this;
		e.preventDefault()
		var unassignedStudents = $(".student-icon-draggable:not(.student-icon-assigned)")
		var emptyDesks = $(".desk.active");
		if (unassignedStudents.length === 0 ){
			this.appendOrangeAlert("All students have been assigned to desks. Shuffle will only shuffle students that haven't yet been assigned.If you want to see this in action, drag some students off of their desks and try again!")
		} else if (emptyDesks.length === 0){
			this.appendOrangeAlert("There aren't any empty desks! Shuffle puts unassigned students in empty desks. Drag a few students off of their desks to make room!")
		} else if (emptyDesks.length < unassignedStudents.length){
			this.appendOrangeAlert("There are fewer empty desks than students! Not all students have seats. Eek!")
		} else {
			$("#alerts").empty()
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
				seatAssignment.save({},{
					success: function(seatAssignment){
	    			seatingChart.seatAssignments().add(seatAssignment);
	    			view.placeAssignedStudent(seatAssignment);
					}
				})
			}		
		}
	},

	saveChart: function(e){
		e.preventDefault();
		Backbone.history.navigate("seating_charts/" + this.model.id, { trigger: true })
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
		var content = this.template({
			seatingChart: this.model,
			classroom: this.model.classroom(),
			section: this.model.section()
		});
		this.$el.html(content);
		this.attachSubviews();
		this.addGridToPage();
		this.placeAssignedStudents();
		this.onRender();
		return this;
	},

	placeAssignedStudent: function(seatAssignment){
		var deskId = seatAssignment.get("desk_id")
		var studentId = seatAssignment.get("student_id")
		var student = this.model.students().get(studentId)
		var draggableStudent = $("[student-id=" + studentId + "].student-icon-draggable")[0]
		var droppableDesk = $("[desk-id=" + deskId + "].desk")
		droppableDesk.append(draggableStudent);
		$(droppableDesk).removeClass("active").addClass("info");
		if (draggableStudent.children.length < 2){
			var nameDiv = $("<div>")
				.addClass("desk-label")
				.text(student.get("first_name"))
			$(draggableStudent).append(nameDiv)
		}
		$(draggableStudent)
			.css({ top: 0, left: 0})
			.addClass("student-icon-assigned student-icon-dragged")
			.attr("seat-assignment-id", seatAssignment.id)
			.attr("assigned-desk-id", deskId)
			.addClass("student-icon-dragged")
	},

	placeAssignedStudents: function(){
		this.model.seatAssignments().each(function(seatAssignment){
			this.placeAssignedStudent(seatAssignment)
		}.bind(this))
	},

	detachAllStudents: function(){
		var seatingChart = this.model;
		var grid = this.$("#classroom-grid")[0];
		var $grid = $(grid);
		$(".student-icon-draggable").each(function(i, student_icon){
			$student_icon = $(student_icon);
    	if ($student_icon.hasClass("student-icon-assigned") ){
    		$student_icon.children().remove();
				$(student_icon).append(
					"<span class='glyphicon glyphicon-user' aria-hidden='true'></span> </div>"
				)
				$student_icon.detach();
  			$student_icon.removeClass("student-icon-assigned student-icon-dragged");
  			var seatAssignmentId = $student_icon.attr("seat-assignment-id");
  			var seatAssignment = seatingChart.seatAssignments().getOrFetch(seatAssignmentId);
   			var desk = $("[desk-id=" + $student_icon.attr("assigned-desk-id") + "]");
  			seatAssignment.destroy({
  				success: function(seatAssignment){
  					seatingChart.seatAssignments().remove(seatAssignment);
  					desk.removeClass("info").addClass("active");
  				}
  			});
  			var studentId = $student_icon.attr("student-id");
  			var start = this.$(".student-icon-draggable-start[student-id=" + studentId + "]");
				start.append($student_icon);
  		}
		}.bind(this))
	},
	
	onRender: function () {
		var alert = new SeatingApp.Views.WarningAlert({
			body: "Place students in desks by dragging and dropping!"
		});
		alert = alert.render().$el.addClass("info");
		$("#alerts").html(alert);
		var seatingChart = this.model;
    $(".student-icon-draggable").draggable({
    	start: function(event, ui){
    		var $draggable= $(this);
    		var studentId = $(this).attr("student-id");
    		var student = seatingChart.students().get(studentId);
    		var studentName = student.get("first_name");
    		if (this.children.length < 2){
    			var nameDiv = $("<div>")
						.addClass("desk-label")
						.text(student.get("first_name"));
					$(this).append(nameDiv)
    		}
    		$(this).addClass("student-icon-dragging").addClass("student-icon-dragged");
    		if ( $(this).hasClass("student-icon-assigned") ){
    			$(this).removeClass("student-icon-assigned");
    			var seatAssignmentId = $(this).attr("seat-assignment-id");
    			var seatAssignment = seatingChart.seatAssignments().getOrFetch(seatAssignmentId);
     			var desk = $("[desk-id=" + $(this).attr("assigned-desk-id") + "]");
    			seatAssignment.destroy({
    				success: function(seatAssignment){
    					var name = desk.text().slice(3)
    					var alert = new SeatingApp.Views.WarningAlert({
									body: name + " has been un-seated!"
								});
							alert = alert.render().$el;
							$("#alerts").html(alert);
    					seatingChart.seatAssignments().remove(seatAssignment);
    					desk.removeClass("info").addClass("active");
    				}
    			});
    		}
    	},
    	stop: function(event, ui){
    		$(this).removeClass("student-icon-dragging");
    	},
    	stack: ".student-icon-draggable"
    });
    $(".desk").droppable({
    	out: function(event, ui){   
    		$(this).removeClass("danger") ;		
    	},
    	over: function(event, ui){
    		if ($(this).hasClass("info") && 
    				ui.draggable[0] !== event.target.children[0]
    				){
    			$(this).addClass("danger");
    		}
    	},
      drop: function( event, ui ) {
      	if (!$(this).hasClass("active")) {
    			$(this).addClass("danger");
    		} else {
	      	var that = this;
	      	var desk_div = $(event.target);
		      	var desk_id = $(event.target).attr("desk-id");
		      	var student_id = $(ui.draggable).attr("student-id");
		      	var seating_chart_id = seatingChart.id;
		      	var seatAssignment = new SeatingApp.Models.SeatAssignment({
		      		seating_chart_id: seating_chart_id,
		      		student_id: student_id,
		      		desk_id: desk_id
		      	})
		      	var student = seatingChart.students().get(student_id);
		      	var name = student.get("first_name");
		      	seatAssignment.save({},{
		      		success: function(){
		      			var alert = new SeatingApp.Views.DismissableAlert({
									body: name + " has been seated!"
								});
								alert = alert.render().$el;
								$("#alerts").html(alert);
		      			var student = ui.draggable;
		      			$(that).append(student);
		      			$(student).css({top: 0, left: 0, position: "absolute", padding: "8px 16px"});
		      			desk_div.removeClass("active");
		      			desk_div.addClass("info");
		      			seatingChart.seatAssignments().add(seatAssignment);
		      			ui.draggable.removeClass("unassigned").addClass("student-icon-assigned");
		      			ui.draggable.attr("assigned-desk-id", desk_id);
		      			ui.draggable.attr("seat-assignment-id", seatAssignment.id);
		      		}.bind(this)
		      	})
	      	}
    		}
    });
	},

	addDesksToGrid: function(){
		this.model.desks().each(function(desk){
			var row = desk.get('row');
			var col = desk.get('column');
			var desk_id = desk.get("id");
			var occupied_square = $("td[row-num='" + row + "'][col-num='" + col +  "']");
			occupied_square.addClass("active desk").attr("desk-id", desk_id);
		})
	},

	addGridToPage: function(){
		for (var i = 0; i < this.model.classroom().get("height"); i++) {
			var row = $("<tr>").addClass("classroom-row");
			var find = $("#classroom-grid");
			$("#classroom-grid").append(row);
			for (var j = 0; j < this.model.classroom().get("width"); j++) {
				var cell = $("<td>").addClass("classroom-square-no-border").attr("row-num", i).attr("col-num", j);
				row.append(cell);
			}
		}
		this.addDesksToGrid();
	},

	addClassroomShowSubview: function(){
		var view = new SeatingApp.Views.ClassroomShow({ model:this.model.classroom()});
		
	},

	addStudentIndexItem: function(student){
		var view = new SeatingApp.Views.StudentIndexItemDraggable({ model: student });
		this.addSubview("#students-table", view)
	}
})