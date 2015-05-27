Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});
createCommentNotification = function(comment) {
  var blog = Blogs.findOne(comment.blogId);
  
  if (comment.userId !== blog.userId) {
    Notifications.insert({
      userId: blog.userId,
      blogId: blog._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};
