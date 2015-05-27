Template.blog.helpers({
  comments: function() {
    var cursor =  Comments.find({blogId: this._id});
    return cursor;
  }
});
