Meteor.publish('blogs', function() {
  return Blogs.find({publish: true});
});

Meteor.publish('unpublishedBlogs', function() {
  return Blogs.find({publish: false});
});

Meteor.publish('comments', function(blogId) {
  check(blogId, String);
  return Comments.find({blogId: blogId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish('carouselImages', function() {
  return CarouselImages.find({userId: this.userId});
});

Sortable.collections = ['carouselImages'];
