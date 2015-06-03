Pages = new Meteor.Pagination(Blogs, {
  templateName: "blogs",
  debug: true,
  infinite: true,
  infiniteTrigger: .8,
  infiniteRateLimit: 1,
  infiniteStep: 1,
  router: "iron-router",
  homeRoute: "/",
  route:"/",
  routerTemplate: "blogs",
  routerLayout:"index",
  itemTemplate: "blogCard",
  sort: {
    submitted: -1
  },
  filters: {
    publish: true
  }
   
});
PagesNotPublished = new Meteor.Pagination(Blogs, {
  templateName: "nonPublishedBlogs",
  debug: true,
  infinite: true,
  infiniteTrigger: .8,
  infiniteRateLimit: 1,
  infiniteStep: 1,
  router: "iron-router",
  homeRoute: "/blogs/",
  route: "/blogs/",
  routerTemplate: "nonPublishedBlogs",
  routerLayout:"index",

  itemTemplate: "blogCard",
  sort: {
    submitted: -1
  },
  filters: {
    publish: false
  }
   
});

this.MainRouteController = RouteController.extend({
  onBeforeAction: function() {
    console.log('Clearing subscriptions');

    Pages.unsubscribe()
    PagesNotPublished.unsubscribe()

    return this.next();
  }
});
