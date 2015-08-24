SeatingApp.Views.RedAlert = Backbone.View.extend({
  template: JST['alerts/red'],

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