SeatingApp.Views.StudentsIndexRootItem = Backbone.View.extend({
	template: JST["students/index_root_item"],
	
	tagName: "tr",

	events: {
		"click .glyphicon-edit": "editStudentModal",
		"click .glyphicon-trash": "destroyStudent"
	},

	destroyStudent: function(e){
		e.preventDefault()
		this.model.destroy({
			success: function(){
				this.collection.remove(this.model)
			}.bind(this)
		})
	},

	editStudentModal: function(e){
		e.preventDefault();
		var top = $('body').scrollTop();
		var editStudentModal = new SeatingApp.Views.StudentFormModal({
			model: this.model,
			collection: this.collection,
		})
		editStudentModal.render()
		editStudentModal.$el.children().css({"position":"fixed"})
		$('body').append(editStudentModal.$el);
	},

	initialize: function(){
		this.listenTo(this.model, "sync remove", this.render)
	},


	render: function(){
		var content = this.template({ student: this.model })
		this.$el.html(content);
		return this;
	}
})