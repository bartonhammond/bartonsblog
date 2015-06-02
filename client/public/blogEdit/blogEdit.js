Template.blogEdit.onCreated(function() {
  Session.set('blogSubmitErrors', {});
  Session.set('UUID', this.data.uuid);
});
Template.blogEdit.events({
  'submit form': function(e, tmpl) {
    e.preventDefault();
    var blogId = this._id;
    var _self = this;
    var blog = {
      uuid: Session.get('UUID'),
      title: tmpl.find("#title").value,
      lead: tmpl.find("#lead").value,
      fromDate: getISODate(tmpl.find("#fromDate").value),
      toDate: getISODate(tmpl.find("#toDate").value),
      description: $(e.target).find('#summernote').code(),
      publish: tmpl.find("#publish").checked,
      carousel: CarouselImages.find({uuid: Session.get('UUID')},
                                     {sort: {order: 1}}
                                   ).fetch()
    }//blog
    
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
