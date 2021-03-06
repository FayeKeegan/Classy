SeatingApp.Views.ClassroomsEditModal = Backbone.View.extend({
  template: JST['classrooms/destroy_modal'],

  events: {
    'click .m-background': 'remove',
    'click .close': 'removeBtn'
  },

  initialize: function () {
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
    var content = this.template()
    this.$el.html(content);
    return this;
  },

});