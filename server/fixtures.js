// Fixture data
if (Blogs.find().count() === 0) {
  var now = new Date().getTime();
  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);
  
  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);

  var telescopeId = Blogs.insert({
    typeCard: 'foo',
    title: 'Introducing Telescope',
    description: 'some description',
    img: "img/sample/sintel/sample-sintel-1.jpg",
    userId: sacha._id,
    publish: true,
    author: sacha.profile.name,
    commentsCount: 2,
    submitted: new Date(now - 7 * 3600 * 1000)
  });
  
  Comments.insert({
    blogId: telescopeId,
    userId: tom._id,
    author: tom.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project Sacha, can I get involved?'
  });
  
  Comments.insert({
    blogId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can Tom!'
  });

  for (var i = 0; i < 1000; i++) {
    Blogs.insert({
      typeCard: 'foo',
      title: 'Introducing Telescope',
      description: 'some description',
      img: "img/sample/sintel/sample-sintel-1.jpg",
      userId: sacha._id,
      publish: true,
      author: sacha.profile.name,
      commentsCount: 0,
      submitted: new Date(now - 7 * 3600 * 1000)
    });

  }
}

