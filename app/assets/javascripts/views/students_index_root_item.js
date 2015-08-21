SeatingApp.Views.StudentsIndexRootItem = Backbone.View.extend({
	template: JST["students/index_root_item"],
	
	tagName: "tr",

	events: {
		"click td": "editStudentModal"
	},

	editStudentModal: function(e){
		e.preventDefault();
		
		var editStudentModal = new SeatingApp.Views.StudentFormModal({
			model: this.model,
			collection: this.collection
		})
		$('body').append(editStudentModal.$el);
		editStudentModal.render()
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