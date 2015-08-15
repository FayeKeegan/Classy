SeatingApp.Views.StudentsNewModal = Backbone.View.extend({
  template: JST['students/new_modal'],

  events: {
    'submit form': 'createStudent',
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

  createStudent: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function (student) {
        this.collection.add(this.model);
        this.remove();
      }.bind(this)
    });
  },

  render: function () {
    var content = this.template()
    this.$el.html(content);
    return this;
  },

});