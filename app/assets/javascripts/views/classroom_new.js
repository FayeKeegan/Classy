SeatingApp.Views.ClassroomNew = Backbone.View.extend({
  template: JST['classrooms/new'],

  events: {
    "submit form": "createClassroom"
  },

  initialize: function(options){
    this.body = options.body;
  },

  render: function () {
    var content = this.template({
      body: this.body
    })
    this.$el.html(content);
    return this;
  },

  createClassroom: function(e){
    e.preventDefault();
    var formData = this.$("form").serializeJSON().classroom
    this.model.save(formData, {
      success: function(classroom){
        this.collection.add(classroom);
        Backbone.history.navigate("classrooms/" + classroom.id + "/edit", { trigger: true })
      }.bind(this),
      error: function(classroom){
        $(".form-group").addClass("has-error")
      }.bind(this)
    })
  }

});