Template.carouselZone.rendered = function(){
  
  Dropzone.autoDiscover = true;

  var dropzone = new Dropzone("form#mycarouselzone", {
    maxFilesize: 6,//mb
    acceptedFiles: 'image/gif, image/jpeg, image/png, image/bmp',
    accept: function(file,done) {
      var _self = this;
      var uuid;
      if (_.isUndefined(Router.current().params._id)) {
        uuid = Session.get('UUID');
      } else {
        uuid = _self.uuid;
      }
      var metaContext = {fileName: file.name, uuid: uuid};
      var myImageUploader = new Slingshot.Upload("myImageUploads", metaContext);
      processImage(file, 800, 450, function(dataURI) {
        var blob = dataURItoBlob(dataURI);
        myImageUploader.send(blob, function (error, downloadUrl) {
          if (error) {
            done(error);
            throwError(error);
          }
          var carousel = {'uuid': uuid,
                          'name': file.name,
                          'url': downloadUrl,
                          'desc': 'double-click to add description'};
          
          Meteor.call('carouselImageInsert', carousel, function(error, result) {
            if (error) {
              done(error.reason);
              throwError(error.reason);
            }
            dropzone.emit("complete", file);
            dropzone.emit('success', file);
            done();
          });
        });
      });
    } //accept  
  });
};
