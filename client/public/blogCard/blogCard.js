Template.blogCard.helpers({
  written: function() {
    if (_.isUndefined(this.submitted)) {
      return 'Tuesday April 26, 2015';
    } else {
      return moment(new Date(this.submitted.toISOString())).format('dddd MMMM Do YYYY');
    }
  },
  shortDescription: function() {
    if (this.description.length > 100) {
      return this.description.slice(0,99);
    } else {
      return this.description;
    }
  }
});
