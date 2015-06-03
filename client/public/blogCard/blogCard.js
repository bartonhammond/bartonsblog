Template.blogCard.helpers({
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
  },
  firstImage: function() {
    if (this.carousel && this.carousel.length > 0) {
      return this.carousel[0].url;
    }
  },
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  likeColor: function() {
    if (Meteor.userId() && _.contains(this.likers, Meteor.userId())) {
      return 'color: blue';
    } else {
      return '';
    }
  }

});

Template.blogCard.events({
  'click .fa-thumbs-o-up': function(e) {
    e.preventDefault();
    Meteor.call('like', this._id);
  }
});
