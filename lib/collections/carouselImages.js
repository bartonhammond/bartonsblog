CarouselImages = new Mongo.Collection("carouselImages");

CarouselImages.allow({
  update: function(userId, doc) {
    return ownsDocument(userId, doc);
  },
  remove: function(userId, doc) {
    return ownsDocument(userId, doc);
  },
});



Meteor.methods({
  carouselImageInsert: function(carousel) {
    check(Meteor.userId(), String);
    check(carousel, {
      uuid: String,
      name: String,
      url: String,
      desc: String
    });

    var order = CarouselImages.find({uuid: carousel.uuid}).count();
    
    var user = Meteor.user();
    var carouselImage = _.extend(carousel, {
      userId: user._id,
      submitted: new Date(),
      order: order
    });
    
    carouselImage._id = CarouselImages.insert(carouselImage);
    return carouselImage;
    
  }
});
