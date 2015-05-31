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
  },
  lead: function() {
    return 'This is where the lead is going to be entered. It is just plain text and will be great!!! Call me Ishmael.  Some years ago &ndash; never mind how long precisely &ndash; having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.  It is a way I have of driving off the spleen, and regulating the circulation.  Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking peoples hats off &ndash; then, I account it high time to get to sea as soon as I can.'
  }

});

Template.blogCard.events({
  'click .fa-thumbs-o-up': function(e) {
    e.preventDefault();
    Meteor.call('like', this._id);
  }
});
