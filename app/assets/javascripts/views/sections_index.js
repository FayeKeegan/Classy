SeatingApp.Views.SectionsIndex = Backbone.CompositeView.extend({
	template: JST["sections/index"],

	className: "sections-index",

	initialize: function(){
		this.listenTo(this.collection, "sync add", this.render)
		this.collection.each(this.addSectionIndexItem.bind(this));
	},

	addSectionIndexItem: function(section){
		var view = SeatingApp.Views.SectionIndexItem({ model: section });
		this.addSubview("#sections-index", view)
	},

	render: function(){
		var content = this.template({ sections: this})
		this.$el.html(content)
		this.attachSubviews();
		return this;
	}
})