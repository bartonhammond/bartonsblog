Meteor.publish('blogs', function() {
  return Blogs.find({publish: true});
});

Meteor.publish('comments', function(blogId) {
  check(blogId, String);
  return Comments.find({postId: blogId});
});
