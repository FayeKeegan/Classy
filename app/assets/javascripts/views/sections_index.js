SeatingApp.Views.SectionsIndex = Backbone.CompositeView.extend({
	template: JST["sections/index"],

	className: "sections-index",

	initialize: function(){
		this.addSectionNewSubview();
		this.listenTo(this.collection, "sync", this.render);
		this.collection.each(this.addSectionIndexItem.bind(this));
		this.listenTo(this.collection, "add", this.addSectionIndexItem);
		this.listenTo(this.collection, "remove", this.removeSectionIndexItem);
	},

	removeSectionIndexItem: function(section){
		this.removeModelSubview("#sections-index", section);
	},

	addSectionIndexItem: function(section){
		var view = new SeatingApp.Views.SectionIndexItem({ model: section });
		this.addSubview("#sections-index", view);
	},

	addSectionNewSubview: function(){
		var view = new SeatingApp.Views.SectionNewSubview();
		this.addSubview(".new-section", view);
	},

	render: function(){
		var content = this.template({ sections: this});
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})