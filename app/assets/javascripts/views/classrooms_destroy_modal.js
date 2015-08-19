SeatingApp.Views.ClassroomDestroyModal = Backbone.View.extend({
  template: JST['classrooms/destroy_modal'],

  events: {
    "click .m-background": "myRemove",
    "click .close": "removeBtn",
    "click .confirm-destroy-classroom": "destroyClassroom",
    "mouseenter .m-content": "testing",
  },

  destroyClassroom: function(e) {
    e.preventDefault();
    this.model.destroy({
      success: function(classroom){
        Backbone.history.navigate("", { trigger: true });
      }
    })
  },

  initialize: function () {
    window.modal = this;
    $(document).on('keyup', this.handleKey.bind(this));
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  removeBtn: function (event) {
    event.preventDefault();
    this.remove();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

});