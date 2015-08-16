SeatingApp.Views.ClassroomNewModal = Backbone.View.extend({
  template: JST['classrooms/new_modal'],

  events: {
    'submit form.new-classroom-modal': 'createClassroom',
    'click .m-background': 'remove',
    'click .close': 'removeBtn'
  },

  initialize: function () {
    $(document).on('keyup', this.handleKey.bind(this));
    this.setDefaultClassroomSize();
  },

  setDefaultClassroomSize: function(){
    this.model.set({height: 8, width:10})
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

  addGridToPage: function(){
    for (var i = 0; i < this.model.get("height"); i++) {
      var row = $("<tr>").addClass("classroom-row-modal")
      var find = $("#classroom-grid")
      $("#classroom-grid").append(row)
      for (var j = 0; j < this.model.get("width"); j++) {
        var cell = $("<td>").addClass("classroom-square-modal").attr("row-num", i).attr("col-num", j)
        row.append(cell)
      }
    }
  },

  createClassroom: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData, {
      success: function (classroom) {
        this.collection.add(this.model);
        this.remove();
      }.bind(this)
    });
  },

  render: function () {
    var content = this.template()
    this.$el.html(content);
    this.addGridToPage();
    return this;
  },

});