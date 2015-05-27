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
        publish: tmpl.find("#publish").checked
      };

      Meteor.call('blogInsert', blog, function(error, result) {
        if (error)
          throwError(error.reason);
        if (result.publish) {
          Router.go('blog', {_id: result._id});
        } else {
          Router.go('blogs');
        }
        
      });

    }
  });
