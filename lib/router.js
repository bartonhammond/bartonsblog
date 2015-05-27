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

Router.onBeforeAction('dataNotFound', {only: 'blog'});
