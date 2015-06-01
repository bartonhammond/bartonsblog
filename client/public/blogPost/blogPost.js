Template.blogPost.onCreated(function() {
  Session.set('blogSubmitErrors', {});
  Session.set('UUID', generateUUID());
});

Template.blogPost.events(
  {
    'submit form': function(e, tmpl) {
      debugger;
      e.preventDefault();
      
      var blog = {
        uuid: Session.get('UUID'),
        title: tmpl.find("#title").value,
        lead: tmpl.find("#lead").value,
        fromDate: getISODate(tmpl.find("#fromDate").value),
        toDate: getISODate(tmpl.find("#toDate").value),
        description: $(e.target).find('#summernote').code(),
        numberComments: 0,
        publish: tmpl.find("#publish").checked,
        carousel: CarouselImages.find({uuid: Session.get('UUID') },
                                      {sort: {order: 1}}
                                     ).fetch()};
      
      
      var errors = validateBlog(blog);
      if (_.keys(errors).length > 0) 
        return Session.set('blogSubmitErrors', errors);
      
      Meteor.call('blogInsert', blog, function(error, result) {
        if (error)
          throwError(error.reason);
        if (result.publish) {
          Router.go('/');
        } else {
          Router.go('blog', {_id: result._id});
        }
        
      });

    }
  });
