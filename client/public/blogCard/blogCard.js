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
