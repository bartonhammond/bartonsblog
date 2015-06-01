Template.blogEdit.onCreated(function() {
  Session.set('blogSubmitErrors', {});
});
Template.blogEdit.events({
  'submit form': function(e, tmpl) {
    e.preventDefault();
    var blogId = this._id;
    
    var blog = {
      img: "img/sample/sintel/sample-sintel-1.jpg",
      title: tmpl.find("#title").value,
      description: tmpl.find("#description").value,
      numberComments: 0,
      publish: tmpl.find("#publish").checked
    };

    var errors = validateBlog(blog);
    if (_.keys(errors).length > 0) 
      return Session.set('postSubmitErrors', errors)
    
    Blogs.update(blogId, {$set: blog}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      }  else {
        Router.go('/');
      }
    });

  },
  'click .delete': function(e) {
    e.preventDefault();
    if (confirm("Delete this blog?")) {
      var blogId = this._id;
      Blogs.remove(blogId);
      Router.go('blogs');
    }
  }
});
