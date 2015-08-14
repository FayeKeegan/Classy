SeatingApp.Views.SectionNewSubview = Backbone.View.extend({
		template: JST["sections/new_subview"],

		className: "new-section-subview",

		render: function(){
			var content = this.template()
			this.$el.html(content)
			return this;
		}
})