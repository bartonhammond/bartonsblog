Router.configure({
  layoutTemplate: 'index',
  loadingTemplate: 'spinner',
  waitOn: function() {
    Meteor.subscribe('blogs');
  }
});
Router.route('/', {
  name: 'blogs'
});
