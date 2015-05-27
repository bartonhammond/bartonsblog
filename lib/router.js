Router.configure({
  layoutTemplate: 'index',
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    Meteor.subscribe('blogs');
  }
});

Router.route('/', {
  name: 'blogs'
});

Router.route('/blog/:_id', {
  name: 'blog',
  data: function() {
    return Blogs.findOne(this.params._id);
  }
});

Router.route('/submit', {name: 'blogPost'});

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
