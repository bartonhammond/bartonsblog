Router.configure({
  layoutTemplate: 'index',
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    [Meteor.subscribe('blogs'),
     Meteor.subscribe('notifications')]
  }
});

Router.route('/blog/:_id', {
  name: 'blog',
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function() {
    return Blogs.findOne(this.params._id);
  }
});

Router.route('/submit', {
  name: 'blogPost',
  waitOn: function(){
    return Meteor.subscribe('carouselImages');
  }
});


Router.route('/blog/:_id/edit', {
  name: 'blogEdit',
  waitOn: function() {
    return [Meteor.subscribe('blog', this.params._id), Meteor.subscribe('carouselImages')]
  },
  data: function() {
    return Blogs.findOne(this.params._id);
  }

});
Router.onStop(function() {
  var _self = this;
  if (Session.get('formChanged')) {
    Session.set('cancelledRouteChange',false);
    if(!confirm("Are you sure you want to navigate away?  You have unsaved changes.  Click Cancel to stay on this page and save your changes.")) {
      Session.set('cancelledRouteChange',true);
      if ('blogEdit' === Router.current().route.getName()) {
        Router.go(Router.current().route.getName(),
                  {_id: Router.current().params._id});
      } else {
        Router.go(Router.current().route.getName());
      }
    }
  }
}, {
  only: ['blogPost', 'blogEdit']
});


Router.onBeforeAction(function() {
  var _self = this;
  if (!Session.get('cancelledRouteChange')) {
    Session.set('cancelledRouteChange',false);
    Audios.remove({});
    ///If edit mode, covert blog.audio to Audios collection
    if (_.isFunction(Router.current().data) && _.isObject(Router.current().data())) {
      var blog = Router.current().data();
      _.each(blog.audio, function(audio) {
        Audios.insert(audio);
      });
    }
  }


  this.next();
}, {
  only: ['blogPost', 'blogEdit']
});

Router.route('/about', {
  name: 'about'
});

Router.route('/contact', {
  name: 'contact'
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'blog'});
Router.onBeforeAction(requireLogin, {only: ['blogPost','nonPublishedBlogs']});
