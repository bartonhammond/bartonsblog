Template.blogPost.onCreated(function() {
  Session.set('blogSubmitErrors', {});
  Session.set('carouselImgUrls', []);
});

Template.blogPost.helpers({
  errorMessage: function(field) {
    return Session.get('blogSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('blogSubmitErrors')[field] ? 'has-error' : '';
  }
});
Template.blogPost.events(
  {
    'submit form': function(e, tmpl) {
      e.preventDefault();
      var blog = {
        typeCard: tmpl.find("#typeCard").value,
        img: "img/sample/sintel/sample-sintel-1.jpg",
        title: tmpl.find("#title").value,
        description: tmpl.find("#description").value,
        filters: "Film",
        numberComments: 0,
        publish: tmpl.find("#publish").checked,
        carousel: Session.get('carouselImgUrls')
      };

      
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
