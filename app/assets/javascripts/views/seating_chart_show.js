SeatingApp.Views.SeatingChartShow = Backbone.CompositeView.extend({
	template: JST["seating_charts/show"],

	events: {
		"mouseenter .student-index-item": "highlightDesk",
		"mouseleave .student-index-item": "unHighlightDesk",
		"mouseenter .classroom-square" : "highlightStudent",
		"mouseleave .classroom-square" : "unHighlightStudent",
		"click .delete-chart-button" : "deleteSeatingChart",
		"click .edit-chart-button" : "editSeatingChart",
		"click .show-math-level-button": "showMathLevel",
		"click .show-reading-level-button": "showReadingLevel",
		"click .remove-level-button": "hideLevels"
	},

	hideLevels: function(){
		$(".student-icon-draggable.student-icon-dragged")
			.removeClass("level1 level2 level3 level4 level5")
	},

	showMathLevel: function(){
		$(".student-icon-draggable.student-icon-dragged").each(function(i, student_icon){
			var id = $(student_icon).attr("student-id");
			var math_level = $(student_icon).attr("math-level");
			var label = $(student_icon).children().detach();
			$(student_icon).removeClass("level1 level2 level3 level4 level5")
			$(student_icon).addClass("level" + math_level).text(math_level);
			$(student_icon).append(label);
		}.bind(this))
	},

	showReadingLevel: function(){
		$(".student-icon-draggable.student-icon-dragged").each(function(i, student_icon){
			var id = $(student_icon).attr("student-id");
			var reading_level = $(student_icon).attr("reading-level");
			var label = $(student_icon).children().detach();
			$(student_icon).removeClass("level1 level2 level3 level4 level5")
			$(student_icon).addClass("level" + reading_level).text(reading_level);
			$(student_icon).append(label);
		}.bind(this))
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

	highlightDesk: function(e) {
		var studentId = $(e.currentTarget).find("div").attr("student-id")
		var square = this.$("td[student-id='" + studentId + "']")
		square.removeClass("info")
		square.addClass("active")
	},

	unHighlightDesk: function(e) {
		var studentId = $(e.currentTarget).find("div").attr("student-id")
		var square = this.$("td[student-id='" + studentId + "']")
		square.removeClass("success")
		square.addClass("info")
	},

	highlightStudent: function(e){
		var studentId = $(e.currentTarget).attr("student-id")
		var studentItem = $("div[student-id='" + studentId + "']").parent()
		studentItem.addClass("info")
	},

	unHighlightStudent: function(e){
		var studentId = $(e.currentTarget).attr("student-id")
		var studentItem = $("div[student-id='" + studentId + "']").parent()
		studentItem.removeClass("info")
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
		return this;
	},

	addDesksToGrid: function(){
		this.model.desks().each(function(desk){
			var row = desk.get('row');
			var col = desk.get('column');
			var desk_id = desk.get("id")
			var occupied_square = $("td[row-num='" + row + "'][col-num='" + col +  "']")
			occupied_square.addClass("active").addClass("desk")
		})
		this.model.seatAssignments().each(function(seatAssignment){
			var row = seatAssignment.desk().get('row');
			var col = seatAssignment.desk().get('column');
			var student = seatAssignment.student()
			var occupied_square = $("td[row-num='" + row + "'][col-num='" + col +  "']")

			occupied_square.addClass("info desk").attr("student-id", student.get("id"))
			var studentLabel = $("<div>").text(student.get("first_name")).addClass("desk-label")
			var studentDiv = $("<div>")
				.addClass("student-icon-draggable")
				.addClass("student-icon-dragged")
				.attr("math-level", student.get("math_level"))
				.attr("reading-level", student.get("reading_level"))
				.text(" ◯ ")
			studentDiv.append(studentLabel)
			occupied_square.append(studentDiv)
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