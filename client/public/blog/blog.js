Template.blog.helpers({
  comments: function() {
    var cursor =  Comments.find({blogId: this._id});
    return cursor;
  },
  getCarouselArray: function() {
    var self = this;
    return _.map(self.carousel, function(value, index){
      return {value: value, index: index, active: index ==0 ? 'active':''};
    });
  },
  from: function() {
    if (_.isUndefined(this.submitted)) {
      return 'Tuesday April 26, 2015';
    } else {
      return moment(new Date(this.fromDate.toISOString())).format('MMMM Do YYYY');
    }
  },
  to: function() {
    if (_.isUndefined(this.submitted)) {
      return 'Tuesday April 26, 2015';
    } else {
      return moment(new Date(this.toDate.toISOString())).format('MMMM Do YYYY');
    }
  }
  
});
Template.blog.rendered = function() {
  $('#portfolio-carousel').carousel({
    interval: 3000,
    cycle: true });
}
