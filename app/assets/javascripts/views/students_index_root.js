SeatingApp.Views.StudentsIndexRoot = Backbone.CompositeView.extend({
	template: JST["students/index_root"],

	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.collection.each(this.addStudentIndexRootItem.bind(this));
		this.listenTo(this.collection, "remove", this.removeStudentIndexItem)
		this.listenTo(this.collection, "add", this.addStudentIndexRootItem);
	},

	removeStudentIndexItem: function(student){
		this.removeModelSubview("#students-root-table-body", student);
	},

	addStudentIndexRootItem: function(student){
		var studentIndexItem = new SeatingApp.Views.StudentsIndexRootItem({
			model: student,
			collection: this.collection
		})
		this.addSubview("#students-root-table-body", studentIndexItem);
	},

	onRender: function(){
		$("#students-root-table").tablesorter();
	},

	render: function(){
		var content = this.template({ students: this.collection });
		this.$el.html(content);
		this.attachSubviews();
		this.onRender();
		return this;
	}
})