SeatingApp.Views.SeatingChartNewModal = Backbone.View.extend({
  template: JST['seating_charts/new_modal'],

  events: {
    'submit form': 'createSeatingChart',
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

  createSeatingChart: function (event) {
    debugger
    event.preventDefault();
    this.remove()
    var formData = $(event.currentTarget).serializeJSON().seatingChart;
    this.model.save(formData, {
      success: function (seatingChart) {
        this.collection.add(seatingChart);
        this.remove()
        Backbone.history.navigate("seating_charts/" + seatingChart.id + "/edit", { trigger: true })
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template());
    this.onRender();
    return this;
  },

  onRender: function () {
    $('.text-field').focus();
  }
});