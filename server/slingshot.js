
Slingshot.createDirective("myImageUploads", Slingshot.S3Storage, {
  bucket: "hammondbucket",

  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file, metaContext) {
    //Store file into a directory by the user's id && uuid which is
    //part of blog
    return this.userId + "/" + metaContext.uuid + "/" + metaContext.fileName;
  }
});

