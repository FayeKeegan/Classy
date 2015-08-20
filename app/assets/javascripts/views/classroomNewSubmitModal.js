SeatingApp.Views.ClassroomsNewSubmitModal= Backbone.View.extend({
  template: JST['classrooms/new_submit_modal'],

  events: {
    'click .m-background': 'remove',
    'click .close': 'removeBtn',
    'click .btn' : 'redirect'
  },

  initialize: function () {
    $(document).on('keyup', this.handleKey.bind(this));
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  redirect: function(event){
    this.remove();
  },

  removeBtn: function (event) {
    event.preventDefault();
    this.remove();
  },

  render: function () {
    var content = this.template({
      classroom: this.model
    })
    this.$el.html(content);
    return this;
  },

});