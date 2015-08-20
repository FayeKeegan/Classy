SeatingApp.Views.StudentsIndexRoot = Backbone.CompositeView.extend({
	template: JST["students/index_root"],

	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.collection.each(this.addStudentIndexRootItem.bind(this));
		this.listenTo(this.collection, "add", this.addStudentIndexRootItem);
	},

	addStudentIndexRootItem: function(student){
		var studentIndexItem = new SeatingApp.Views.StudentsIndexRootItem({
			model: student
		})
		this.addSubview("#students-root-table-body", studentIndexItem);
	},

	render: function(){
		var content = this.template({ students: this.collection });
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})