SeatingApp.Views.SectionDestroyModal = Backbone.View.extend({
  template: JST['sections/destroy_modal'],

  events: {
    "click .m-background": "myRemove",
    "click .close": "removeBtn",
    "click .deny-destroy-section": "removeBtn",
    "click .confirm-destroy-section": "destroySection",
    "mouseenter .m-content": "testing",
  },

  destroySection: function(e) {
    var view = this;
    e.preventDefault();
    this.model.destroy({
      success: function(section){
        Backbone.history.navigate("", { trigger: true });
        view.remove()
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