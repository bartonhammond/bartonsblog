Blogs = new Mongo.Collection('blogs');

Blogs.allow({
  update: function(userId, blog) {
    return ownsDocument(userId, blog);
  },
  remove: function(userId, blog) {
    return ownsDocument(userId, blog);
  },
});


Meteor.methods({
  blogInsert: function(blogAttributes) {
    check(Meteor.userId(), String);
    check(blogAttributes, {
      typeCard: String,
      img: String,
      title: String,
      description: String,
      filters: String,
      numberComments: Number,
      publish: Boolean
    });
    var user = Meteor.user();
    var blog = _.extend(blogAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var blogId = Blogs.insert(blog);
    return {
      _id: blogId
    }; }
});
