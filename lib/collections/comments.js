Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String); check(commentAttributes, {
      blogId: String,
      body: String
    });
    
    var user = Meteor.user();
    var blog = Blogs.findOne(commentAttributes.blogId);
    
    if (!blog)
      throw new Meteor.Error('invalid-comment', 'You must comment on a bloge');

    
    comment = _.extend(commentAttributes,
                       { userId: user._id,
                         author: user.username,
                         submitted: new Date()
                       });

    // update the blog with the number of comments
    Blogs.update(comment.blogId, {$inc: {commentsCount: 1}});
    
    comment._id = Comments.insert(comment);

    createCommentNotification(comment);
    
    return comment._id;
  }
});
