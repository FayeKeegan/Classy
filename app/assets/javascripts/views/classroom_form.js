SeatingApp.Views.ClassroomForm= Backbone.CompositeView.extend({
	template: JST["classrooms/form"],

	events: {
		"mouseenter .classroom-square": "highlightDesk",
		"mouseleave .classroom-square": "unHighlightDesk",
		"click .classroom-square.desk": "destroyDesk",
		"click .classroom-square:not(.desk)": "createDesk",
		"click .create-section-button": "createSection",
		"click .delete-classroom-button": "destroyClassroomModal",
		"click .save-classroom-button": "saveClassroom"
	},

	destroyClassroomModal: function(e){
		e.preventDefault();
		var destroyModal = new SeatingApp.Views.ClassroomDestroyModal({
			model: this.model,
			collection: this.collection
		})
		$('body').append(destroyModal.$el);
		destroyModal.render();
	},

	saveClassroom: function(e){
		e.preventDefault();
		if (this.model.sections().length > 0){
			Backbone.history.navigate("classrooms", { trigger: true })
		} else {
			var newSubmitModal = new SeatingApp.Views.ClassroomsNewSubmitModal({
				model: this.model
			})
			$("body").append(newSubmitModal.$el)
			newSubmitModal.render()

		}
	},

	createClassroomModal: function(e){
		e.preventDefault();
		var destroyModal = new SeatingApp.Views.ClassroomDestroyModal({
			model: this.model
		})
		$('body').append(destroyModal.$el);
		destroyModal.render();
	},


	destroyDesk: function(e){
		var $desk = $(e.currentTarget);
		var desk_id = $desk.attr("desk-id");
		var desk = new SeatingApp.Models.Desk({ id: desk_id });
		desk.fetch({
			success: function(fetchedDesk){
				fetchedDesk.destroy({
					success: function(destroyedDesk){
						$("#alerts").empty()
						var alertStrings = [];
						destroyedDesk.seatAssignments().each(function(seatAssignment){
							alertStrings.push(seatAssignment.seatingChart().get("name") + ": " + seatAssignment.student().get("first_name") + " no longer has a seat")
						})
						alertStrings.forEach(function(alertString){
							var alert = new SeatingApp.Views.GenericAlert({
								body: alertString
							})
							alert = alert.render().$el;
							$("#alerts").append(alert);
						})
						$desk.removeClass("info desk").removeAttr("desk-id");
						this.model.desks().remove(desk);
					}.bind(this)
				})
			}.bind(this)
		});
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
				$("#alerts").empty()
				var alert = new SeatingApp.Views.DismissableAlert({
					body: "New desk created!"
				})
				alert = alert.render().$el;
				$("#alerts").append(alert);
				$desk.addClass("info desk").attr("desk-id", desk.id);
				this.model.desks().remove(desk);
			}.bind(this)
		})
	},

	highlightDesk: function(e) {
		var square = $(e.currentTarget);
		if ($(square).hasClass("desk")){
			$(square).addClass("danger").text("Destroy Desk").css({"text-align": "center"}).toggleClass("temp-desk");;
		} else {
			$(square).addClass("success").text("Add Desk").css({"text-align": "center"}).toggleClass("temp-desk");

		}
	},

	unHighlightDesk: function(e) {
		var square = $(e.currentTarget)
		$(square).removeClass("success danger").text("").toggleClass("temp-desk")
	},

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
	},
	
	render: function(){
		var carefulMessage = this.model.desks().length === 0 ? "" : " ... But be careful! Destroying desks will also leave students who are seated there without a seat!"
		var content = this.template({ classroom: this.model });
		this.$el.html(content);
		this.attachSubviews();
		this.addGridToPage();
		var alert = new SeatingApp.Views.DismissableAlert({
					body: "Edit <strong>" + this.model.escape("name") +"</strong> by clicking in the grid!" + carefulMessage
				})
				alert = alert.render().$el;
				$("#alerts").append(alert);
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