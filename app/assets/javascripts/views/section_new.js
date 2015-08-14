SeatingApp.Views.SectionNew = Backbone.View.extend({
		template: JST["sections/new"],

		className: "new-section",

		initialize: function(options) {
			this.students = options.students
			this.classrooms = options.classrooms
			this.listenTo(this.model, "sync", this.render)
			this.listenTo(this.students, "sync", this.render)
			this.listenTo(this.classrooms, "sync", this.render)
		},

		render: function(){
			var content = this.template({
				section: this.model,
				classrooms: this.classrooms,
				students: this.students
			})
			this.$el.html(content)
			return this;
		}
})