SeatingApp.Views.SeatingChartShow = Backbone.CompositeView.extend({
	template: JST["seating_charts/show"],

	events: {
		"mouseenter .student-index-item": "highlightDesk",
		"mouseleave .student-index-item": "unHighlightDesk",
		"mouseenter .classroom-square-no-border.desk" : "highlightStudent",
		"mouseleave .classroom-square-no-border.desk" : "unHighlightStudent",
		"click .delete-chart-button" : "deleteSeatingChart",
		"click .edit-chart-button" : "editSeatingChart",
		"click .show-math-level-button": "showMathLevel",
		"click .show-reading-level-button": "showReadingLevel",
		"click .show-gender-button": "showGender",
		"click .remove-level-button": "revertIcons",
		"click #classroom-grid" : "enterEditModal"
	},

	enterEditModal : function(e){
		var alert = new SeatingApp.Views.GenericAlert({
				body: ".. you can't edit from here! Click edit on the top right to start dragging and dropping"
			});
		alert = alert.render().$el;
		this.$("#alerts").html(alert);
	},

	revertIcons: function(){
		$(".student-icon-draggable").each(function(i, student_icon){
			var label = $(student_icon).children().detach();
			$(student_icon).removeClass("level1 level2 level3 level4 level5 gender-M gender-F").text("");
			$(student_icon).append(label);
		})
	},

	showLevel: function(category){
		this.revertIcons();
		$(".student-icon-draggable").each(function(i, student_icon){
			var id = $(student_icon).attr("student-id");
			var level_num = this.model.students().get(id).get(category);
			var label = $(student_icon).children().detach();
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

	showGender: function(){
		this.revertIcons();
		$(".student-icon-draggable").each(function(i, student_icon){
			var id = $(student_icon).attr("student-id");
			var gender = this.model.students().get(id).get("gender");
			var label = $(student_icon).children().detach();
			$(student_icon).addClass("gender-" + gender).text(gender);
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
		var studentId = $(e.currentTarget).find("div").attr("student-id");
		var square = this.$("td[student-id='" + studentId + "']");
		square.removeClass("info");
		square.addClass("active");
		square.children().addClass("highlighted-student-icon");
	},

	unHighlightDesk: function(e) {
		var studentId = $(e.currentTarget).find("div").attr("student-id");
		var square = this.$("td[student-id='" + studentId + "']");
		square.removeClass("success");
		square.addClass("info");
		square.children().removeClass("highlighted-student-icon");
	},

	highlightStudent: function(e){
		var studentId = $(e.currentTarget).attr("student-id");
		var studentItem = $("tr.student-index-item > [student-id='" + studentId + "'")
			.first()
			.parent()
			.first()
			.addClass("info")
	},

	unHighlightStudent: function(e){
		var studentId = $(e.currentTarget).attr("student-id");
		var studentItem = $("tr.student-index-item > [student-id='" + studentId + "'")
			.first()
			.parent()
			.first()
			.removeClass("info")
	},

	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.model.students().each(this.addStudentIndexItem.bind(this));
		this.listenTo(this.model.students(), "add", this.addStudentIndexItem.bind(this));
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
		return this;
	},

	addDesksToGrid: function(){
		this.model.desks().each(function(desk){
			var row = desk.get('row');
			var col = desk.get('column');
			var desk_id = desk.get("id")
			var occupied_square = $("td[row-num='" + row + "'][col-num='" + col +  "']");
			occupied_square.addClass("active").addClass("desk");
		})
		this.model.seatAssignments().each(function(seatAssignment){
			var row = seatAssignment.desk().get('row');
			var col = seatAssignment.desk().get('column');
			var student = seatAssignment.student();
			var occupied_square = $("td[row-num='" + row + "'][col-num='" + col +  "']");
			occupied_square.addClass("info desk").attr("student-id", student.get("id"));
			var studentLabel = $("<div>").text(student.get("first_name")).addClass("desk-label");
			var studentDiv = $("<div>")
				.addClass("student-icon-draggable")
				.attr("math-level", student.get("math_level"))
				.attr("reading-level", student.get("reading_level"))
				.attr("student-id", student.id)
				.append("<span class='glyphicon glyphicon-user' aria-hidden='true'></span>")
			studentDiv.append(studentLabel);
			occupied_square.append(studentDiv);
		})
	},

	addGridToPage: function(){
		for (var i = 0; i < this.model.classroom().get("height"); i++) {
			var row = $("<tr>").addClass("classroom-row");
			var find = $("#classroom-grid");
			$("#classroom-grid").append(row);
			for (var j = 0; j < this.model.classroom().get("width"); j++) {
				var cell = $("<td>").addClass("classroom-square-no-border").attr("row-num", i).attr("col-num", j)
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