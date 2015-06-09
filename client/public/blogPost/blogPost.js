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
insertBlog = function(e, tmpl,  ezModal) {
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
  if (_.keys(errors).length > 0)  {
    ezModal.modal('hide');
    return Session.set('blogSubmitErrors', errors);
  }
  
  Meteor.call('blogInsert', blog, function(error, result) {
    ezModal.modal('hide');
    if (error)
      throwError(error.reason);
    if (result.publish) {
      Router.go('/');
    } else {
      Router.go('blog', {_id: result._id});
    }
    
  });

}
Template.blogPost.events(
  {
    'submit form': function(e, tmpl) {
      e.preventDefault();

      var ezModal = EZModal({
        size: 'sm',
        classes: 'text-center',
        body: 'Saving data ... this may take a few moments',
        hideFooter: true
      });
      

      async.each(Audios.find({}).fetch(), function(audio, callback) {
        
        if (_.isUndefined(audio.mp3URL)) {
          var blob = new Blob([audio.blob.file],{type: audio.blob.type});
          var metaContext = {_id: audio._id, uuid: audio.uuid};
          
          var myAudioUploader = new Slingshot.Upload("myAudioUploads", metaContext);

          myAudioUploader.send(blob, function (error, downloadUrl) {
            if (!error) {
              Audios.update(
                {_id: audio._id}, 
                {$set:
                 { mp3URL: downloadUrl}
                });
              callback()
            } else {
              callback(error);
            }
            
          }); //send
        } else {
          callback();
        }
      }, function(err){
        // if any of the file processing produced an error, err would equal that error
        if( err ) {
          // One of the iterations produced an error.
          // All processing will now stop.
          console.log('A file failed to process');
          console.log(err);
          ezModal.modal('hide');
        } else {
          insertBlog(e, tmpl, ezModal);
        }
      });
    }
  });
