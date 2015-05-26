Meteor.publish('blogs', function() {
  return Blogs.find({publish: true});
});
