SeatingApp.Views.ClassroomNewModal = Backbone.View.extend({
  template: JST['classrooms/new_modal'],

  events: {
    'click .create-classroom': 'createClassroom',
    'click .m-background': 'remove',
    'click .close': 'removeBtn',
    'mouseenter .classroom-square-modal': 'makeSquareActive',
    'mouseleave .classroom-square-modal': 'makeSquareInactive',
    'click .classroom-square-modal': 'toggleDesk'
  },

  initialize: function () {
    $(document).on('keyup', this.handleKey.bind(this));
    this.setDefaultClassroomSize();
  },

  setDefaultClassroomSize: function(){
    this.model.set({height: 8, width:10})
  },

  makeSquareActive: function(e){
    $(e.currentTarget).addClass("active")
  },

  toggleDesk: function(e){
    $(e.currentTarget).toggleClass("info")
    $(e.currentTarget).toggleClass("hasDesk")
  },

  makeSquareInactive: function(e){
    $(e.currentTarget).removeClass("active")
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

  getDeskPositions: function(){
    var desks = this.$(".hasDesk")
    var deskPositions = []
    $.each(desks, function(i, desk){
        var row_num = $(desk).attr("row-num")
        var col_num = $(desk).attr("col-num")
        deskPositions.push([row_num, col_num])
      })
    return deskPositions;
  },

  createClassroom: function (event) {
    event.preventDefault();
    var classroom = this.model
    var formData = $(event.delegateTarget).find("form").serializeJSON()
    var deskPositions = this.getDeskPositions() 
    this.model.save(formData.classroom, {
      success: function (classroom) {
        this.collection.add(classroom);
        deskPositions.forEach(function(deskPosition){
          var d = new SeatingApp.Models.Desk()
          d.set({
            row: deskPosition[0],
            column: deskPosition[1],
            classroom_id: classroom.id
          })
          d.save({}, {
            success: function(){
              classroom.desks().add(d)
            }
          })
        }.bind(this))
        this.remove();
        $("#selectable-classroom").find("[value="+ classroom.id + "]").attr("selected", true)

      }.bind(this)
    });
  },

  render: function () {
    var content = this.template()
    this.$el.html(content);
    this.addGridToPage();
    return this;
  }

});