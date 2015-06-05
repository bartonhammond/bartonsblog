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
  audios: function() {
    return this.audio;
  },
  getSrc: function() {
    if (_.isEmpty(this.mp3URL)){
      return this.blob.blobURL;
    } else {
      return this.mp3URL;
    }
  }
});
Template.blog.rendered = function() {
  $('#portfolio-carousel').carousel({
    interval: 3000,
    cycle: true });
}
