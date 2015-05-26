Meteor.subscribe('blogs');

Template.blogs.helpers({
  blogs: function(){
    return Blogs.find();
  }
})
