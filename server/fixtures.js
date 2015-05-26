if (Blogs.find().count() === 0) {
  Blogs.insert({
    typeCard: "film art",
    img: "img/sample/sintel/sample-sintel-1.jpg",
    title: "Sintel at Seattle International Film Festival",
    written: "Saturday 27 April 2015",
    description: "This 15 minute film has been realised in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realised online, by developers and artists and teams all over the world.",
    filters: "Film",
    numberComments: "3",
    publish: false
  });
  Blogs.insert({
    typeCard: "film art",
    img: "img/sample/sintel/sample-sintel-1.jpg",
    title: "Sintel at Seattle International Film Festival",
    written: "Saturday 27 April 2015",
    description: "This 15 minute film has been realised in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realised online, by developers and artists and teams all over the world.",
    filters: "Film",
    numberComments: "5",
    publish: true
  });
}
