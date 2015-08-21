SeatingApp.Views.WarningAlert = Backbone.View.extend({
  template: JST['alerts/warning'],

  initialize: function(options){
    this.body = options.body;
  },

  render: function () {
    var content = this.template({
      body: this.body
    })
    this.$el.html(content);
    return this;
  }

});