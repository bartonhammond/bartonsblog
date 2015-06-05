Slingshot.fileRestrictions("myImageUploads", {
  allowedFileTypes: ["image/gif","image/jpeg", "image/png", "image/bmp"],
  maxSize: 3 * 1024 * 1024 // 3 MB
});

Slingshot.fileRestrictions("myAudioUploads", {
  allowedFileTypes: ["audio/mp3"],
  maxSize: 5 * 1024 * 1024 // 5 MB
});
