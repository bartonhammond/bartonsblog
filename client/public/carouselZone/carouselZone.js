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
    maxFilesize: 3,//mb
    acceptedFiles: 'image/gif, image/jpeg, image/png, image/bmp',
    accept: function(file,done) {
      var metaContext = {fileName: file.name};
      var myImageUploader = new Slingshot.Upload("myImageUploads", metaContext);
      var thisDone = done;
      processImage(file, 800, 450, function(dataURI) {
        var blob = dataURItoBlob(dataURI);
        myImageUploader.send(blob, function (error, downloadUrl) {
          if (error) {
            thisDone(error);
            throwError(error);
          }
          var imgUrls = Session.get('carouselImgUrls');
          imgUrls.push({'name': file.name, 'url': downloadUrl});
          Session.set('carouselImgUrls',imgUrls);
          thisDone();
        });
      });
    }
  });
};
