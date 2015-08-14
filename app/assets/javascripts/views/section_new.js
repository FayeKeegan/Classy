SeatingApp.Views.SectionNew = Backbone.View.extend({
		template: JST["sections/new"],

		className: "new-section",

		initialize: function(){
			this.listenTo(this.model, "sync", this.render)
		},

		events: {
			"click #create-new-section": "createSubview"
		},

		render: function(){
			var content = this.template({
			})
			this.$el.html(content)
			return this;
		}
})