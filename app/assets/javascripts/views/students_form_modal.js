SeatingApp.Views.StudentFormModal = Backbone.View.extend({
  template: JST['students/form_modal'],

  events: {
    'submit form': 'createStudent',
    'click .m-background': 'remove',
    'click .close': 'removeBtn'
  },

  initialize: function (options) {
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
        $("[student-id=" + student.id + "]:checkbox").prop("checked", true)
      }.bind(this),
      error: function(student, response){
        if (response.responseText.indexOf("First name") !== -1){
          this.$(".first-name-form-group").addClass("has-error");
        }
        if (response.responseText.indexOf("Last name") !== -1 ){
          this.$(".last-name-form-group").addClass("has-error");
        }
      }.bind(this)
    });
  },

  render: function () {
    var content = this.template({
      student: this.model,
    })
    this.$el.html(content);
    return this;
  },

});