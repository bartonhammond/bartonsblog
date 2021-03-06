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
  if (!blog.title)
    errors.title = "Please fill in a Title";
  if (!blog.lead)
    errors.lead = "Please fill in a Lead";
    if (!blog.description)
    errors.description = "Please fill in a Description";

  return errors;
}



Meteor.methods({
  blogInsert: function(blog) {
    check(Meteor.userId(), String);
    check(blog, {
      uuid: String,
      title: String, 
      lead: String,
      description: String,
      fromDate: Date,
      toDate: Date,
      numberComments: Number,
      publish: Boolean,
      audio: Array,
      carousel: Array
    });
    var errors = validateBlog(blog);
    if (_.keys(errors).length > 0) {
      throw new Meteor.Error('invalid-blog', "Invalid blog - please correct");
    }
    
    var user = Meteor.user();
    var ablog = _.extend(blog, {
      userId: user._id,
      author: user.username,
      submitted: new Date(),
      commentsCount: 0,
      likers: [],
      likes: 0
    });
    ablog._id = Blogs.insert(ablog);

    return ablog;
  },
  like: function(blogId) {
    check(blogId, String);

    if (! Meteor.userId()) {
      return;
    }
    
    var blog = Blogs.findOne(blogId);
    if (!blog)
      throw new Meteor.Error('invalid', 'Blog not found');

    if (blog.userId === Meteor.userId()) {
      return;
    }

    if (_.contains(blog.likers, Meteor.userId())) {
      Blogs.update(blog._id, {
        $pull: {likers: Meteor.userId()}, $inc: {likes: -1}
      });
    } else {
      Blogs.update(blog._id, {
        $addToSet: {likers: Meteor.userId()}, $inc: {likes: 1}
      });
    }
  },
  removeAudio: function(audio) {
    debugger;
    check(audio, Object);
    
    var blog = Blogs.findOne({uuid: audio.uuid});
    if (!blog)
      throw new Meteor.Error('invalid', 'Blog not found');

    Blogs.update(blog._id, {
      $pull: {audio: {_id:  audio._id}}
    });
    
    
  }
});
