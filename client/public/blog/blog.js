Template.blog.helpers({
  comments: function() {
    var cursor =  Comments.find({blogId: this._id});
    return cursor;
  },
  getCarouselArray: function() {
    var self = this;
    return _.map(self.carousel, function(value, index){
      return {value: value, index: index, active: index ==0 ? 'active':''};
    });
  },
  
});
