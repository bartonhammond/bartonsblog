Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});
Template.notificationItem.helpers({
  notificationBlogPath: function() {
    return Router.routes.blog.path({_id: this.blogId}); }
});

Template.notificationItem.events({ 'click a': function() {
  Notifications.update(this._id, {$set: {read: true}}); }
});
