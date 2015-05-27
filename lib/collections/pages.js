Pages = new Meteor.Pagination(Blogs, {
  debug: true,
  infinite: true,
  infiniteTrigger: .8,
  infiniteRateLimit: 1,
  infiniteStep: 1,
  router: "iron-router",
  routerLayout:"index",
  routerTemplate: "blogs",
  itemTemplate: "blogCard",
  sort: {
    submitted: -1
  },
  filters: {
    publish: {$eq: true}
  }
  
});
