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
Template.blogEdit.events({
  
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
      audio: audiosArray,
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
