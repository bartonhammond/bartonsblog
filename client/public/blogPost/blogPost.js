Template.blogPost.rendered = function() {
  $('#summernote').summernote({
    width: '100%',
    height: '300px',
    focus: true,
    toolbar:[
      ['style', ['style', 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['color', ['color']],
      ['font', ['bold', 'underline', 'clear']],
      ['para', ['ul','ol', 'paragraph']],
      ['insert', ['link', 'table', 'hr']],
      ['group',['video']]
      
    ]
  });


  
};


Template.blogPost.onCreated(function() {
  Session.set('blogSubmitErrors', {});
  Session.set('UUID', generateUUID());
  Session.set('copyURL','');
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
        uuid: Session.get('UUID'),
        typeCard: tmpl.find("#typeCard").value,
        img: "img/sample/sintel/sample-sintel-1.jpg",
        title: tmpl.find("#title").value,
        description: $(e.target).find('#summernote').code(),
        filters: "Film",
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
