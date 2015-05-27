Template.blogEdit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.blogEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.blogEdit.events({
  'submit form': function(e, tmpl) {
    e.preventDefault();
    var blogId = this._id;
    
    var blog = {
      typeCard: tmpl.find("#typeCard").value,
      img: "img/sample/sintel/sample-sintel-1.jpg",
      title: tmpl.find("#title").value,
      description: tmpl.find("#description").value,
      filters: "Film",
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
        Router.go('blog', {_id: blogId});
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
