Template.blogEdit.onCreated(function() {
  Session.set('blogSubmitErrors', {});
  Session.set('UUID', this.data.uuid);
});


Template.blogEdit.rendered = function() {
  Session.set('formChanged',false);
  Meteor.defer(function () {
    $('body').scrollTop(0);
  });
}
saveBlog = function(e, tmpl, blogId, ezModal) {
  
  Session.set('formChanged',false);

  var audiosArray = [];
  _.each(Audios.find().fetch(), function(audio) {
    var toAdd = _.pick(audio,'_id', 'mp3URL', 'uuid', 'submitted');
    audiosArray.push(toAdd);
  });
  
  var _self = this;
  var blog = {
    uuid: Session.get('UUID'),
    title: tmpl.find("#title").value,
    lead: tmpl.find("#lead").value,
    fromDate: getISODate(tmpl.find("#fromDate").value),
    toDate: getISODate(tmpl.find("#toDate").value),
    description: $(e.target).find('#summernote').code(),
    publish: tmpl.find("#publish").checked,
    audio: audiosArray,
    carousel: CarouselImages.find({uuid: Session.get('UUID')},
                                  {sort: {order: 1}}
                                 ).fetch()
  }//blog
  
  var errors = validateBlog(blog);
  if (_.keys(errors).length > 0) 
    return Session.set('postSubmitErrors', errors)
  
  Blogs.update(blogId,
               {$set: blog}, function(error) {
    ezModal.modal('hide');
    if (error) {
      // display the error to the user
      alert(error.reason);
    }  else {
      Router.go('/');
    }
  });

}
Template.blogEdit.events({
  
  'submit form': function(e, tmpl) {
    e.preventDefault();

    var blogId = this._id;
    
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
        saveBlog(e, tmpl, blogId, ezModal);
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
