SeatingApp.Views.StudentsNew = Backbone.View.extend({
	template: JST["students/new"],

	events: {
		"submit form": "createStudent"
	},

	initialize: function(){
		this.listenTo(this.model, "sync", this.render)
	},

	render: function(){
		var content = this.template({
			student: this.model
		})
		this.$el.html(content)
		return this
	},

	createStudent: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function (student) {
        this.collection.add(this.model);
        Backbone.history.navigate("students", { trigger: true })
      }.bind(this),
      error: function(student, response){
        if (response.responseText.indexOf("First name") !== -1){
          this.$(".first-field").css({"background-color": "red"});
        }
        if (response.responseText.indexOf("Last name") !== -1 ){
          this.$(".last-field").css({"background-color": "red"});
        }
      }.bind(this)
    });
  },


})