dataURItoBlob = function(dataURI) {
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for(var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: mimeString});
}

uploadDescriptionImage = function(file, $summernote, ezModal) {
  var metaContext = {fileName: file.name, uuid: Session.get('UUID')};
  var myImageUploader = new Slingshot.Upload("myImageUploads", metaContext);
  processImage(file, 800, 450, function(dataURI) {
    var blob = dataURItoBlob(dataURI);
    myImageUploader.send(blob, function (error, downloadUrl) {
      if (error) {
        throwError(error);
      }
      $summernote.summernote('editor.insertImage',downloadUrl);
      Event.emit('summernoteImageUploadComplete', {
        data: file.name,
        ezModal: ezModal
      })
    });
  });
}

getISODate = function(dateString) {
  var parts = dateString.split('/');
  //please put attention to the month (parts[0]), Javascript counts months from 0:
  // January - 0, February - 1, etc
  var mydate = new Date(parts[2],parts[0]-1,parts[1]);
  return mydate;
}

