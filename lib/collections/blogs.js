Blogs = new Mongo.Collection('blogs');

Blogs.deny({
  update: function(userId, blog, fieldNames, modifier) {
    var errors = validateBlog(modifier.$set);
    return _.keys(errors).length > 0;
  }
});

Blogs.allow({
  update: function(userId, blog) {
    return ownsDocument(userId, blog);
  },
  remove: function(userId, blog) {
    return ownsDocument(userId, blog);
  },
});


validateBlog = function (blog) {
  var errors = {};
  if (!blog.typeCard)
    errors.typeCard = "Please fill in the type of card";
  if (!blog.title)
    errors.title = "Please fill in a Title";
  if (!blog.description)
    errors.description = "Please fill in a Description";
  return errors;
}



Meteor.methods({
  blogInsert: function(blog) {
    check(Meteor.userId(), String);
    check(blog, {
      typeCard: String,
      img: String,
      title: String,
      description: String,
      filters: String,
      numberComments: Number,
      publish: Boolean
    });
    var errors = validateBlog(blog);
    if (_.keys(errors).length > 0) {
      throw new Meteor.Error('invalid-post', "Invalid blog - please correct");
    }
    
    var user = Meteor.user();
    var ablog = _.extend(blog, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      commentsCount: 0
    });
    ablog._id = Blogs.insert(ablog);
    return ablog;
  }
});
