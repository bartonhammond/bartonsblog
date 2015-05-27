Template.blogs.helpers({
  blogs: function(){
    return Blogs.find({},
                      {
                        sort: {submitted: -1}
                      }); 
  }
});
