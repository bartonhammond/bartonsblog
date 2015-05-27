Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String); check(commentAttributes, {
      postId: String,
      body: String
    });
    var user = Meteor.user();
    var blog = Blogs.findOne(commentAttributes.postId);
    if (!blog)
      throw new Meteor.Error('invalid-comment', 'You must comment on a bloge');

    
    comment = _.extend(commentAttributes,
                       { userId: user._id,
                         author: user.username,
                         submitted: new Date()
                       });

    // update the blog with the number of comments
    Blogs.update(comment.postId, {$inc: {commentsCount: 1}});
    
    return Comments.insert(comment);
  }
});
