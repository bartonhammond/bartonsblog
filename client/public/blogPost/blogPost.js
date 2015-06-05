Template.blogPost.onCreated(function() {
  Session.set('blogSubmitErrors', {});
  Session.set('UUID', generateUUID());
});

Template.blogPost.rendered = function() {
  Session.set('formChanged',false);
  Meteor.defer(function () {
    $('body').scrollTop(0);
  });

}
Template.blogPost.events(
  {
    'submit form': function(e, tmpl) {
      e.preventDefault();
      var pendingAudio =  _.find(Audios.find().fetch(), function(audio) {
        return _.isUndefined(audio.mp3URL);
      });

      if (pendingAudio) {
        if(!confirm("Are you sure you want to navigate away?  You have unsaved audio.  Click Cancel to stay on this page and save your changes.")) {
          return;
        }
      }
      Session.set('formChanged',false);
      
      var audiosArray = [];
      _.each(Audios.find().fetch(), function(audio) {
        var toAdd = _.pick(audio,'_id', 'mp3URL', 'uuid', 'submitted');
        audiosArray.push(toAdd);
      });
      
      var blog = {
        uuid: Session.get('UUID'),
        title: tmpl.find("#title").value,
        lead: tmpl.find("#lead").value,
        fromDate: getISODate(tmpl.find("#fromDate").value),
        toDate: getISODate(tmpl.find("#toDate").value),
        description: $(e.target).find('#summernote').code(),
        numberComments: 0,
        publish: tmpl.find("#publish").checked,
        audio: audiosArray,
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
