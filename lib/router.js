Router.configure({
  layoutTemplate: 'index',
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    [Meteor.subscribe('blogs'), Meteor.subscribe('notifications')]
  }
});

Router.route('/', {
  name: 'blogs'
});

Router.route('/blog/:_id', {
  name: 'blog',
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function() {
    return Blogs.findOne(this.params._id);
  }
});

Router.route('/submit', {name: 'blogPost'});


Router.route('/blog/:_id/edit', {
  name: 'blogEdit',
  data: function() {
    return Blogs.findOne(this.params._id);
  }
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'blog'});
Router.onBeforeAction(requireLogin, {only: 'blogPost'});
