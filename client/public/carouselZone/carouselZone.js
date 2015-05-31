function dataURItoBlob(dataURI) {
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for(var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: mimeString});
}


Template.carouselZone.rendered = function(){
  
  Dropzone.autoDiscover = true;

  var dropzone = new Dropzone("form#mycarouselzone", {
    maxFilesize: 6,//mb
    acceptedFiles: 'image/gif, image/jpeg, image/png, image/bmp',
    accept: function(file,done) {
      var metaContext = {fileName: file.name, uuid: Session.get('UUID')};
      var myImageUploader = new Slingshot.Upload("myImageUploads", metaContext);
      processImage(file, 800, 450, function(dataURI) {
        var blob = dataURItoBlob(dataURI);
        myImageUploader.send(blob, function (error, downloadUrl) {
          if (error) {
            done(error);
            throwError(error);
          }

          var carousel = {'uuid': Session.get('UUID'),
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
    }
  });
};
