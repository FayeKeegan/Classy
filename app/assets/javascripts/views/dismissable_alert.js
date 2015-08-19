SeatingApp.Views.DismissableAlert = Backbone.View.extend({
  template: JST['alerts/dismissable_alert'],

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