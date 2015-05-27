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
