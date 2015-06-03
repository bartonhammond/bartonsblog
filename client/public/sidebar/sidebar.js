Template.sidebar.onCreated(function() {
  Pages.set({
    filters: {
      publish: {$eq: true}
    }
  });
})

Template.sidebar.events({
  'click #publishedBlogs': function() {
    Pages.set({
      filters: {
        publish: {$eq: true}
      }
    });
  },
  'click #nonpublishedBlogs': function() {
    Pages.set({
      filters: {
        publish: {$eq: false}
      }
    });
  }
})
