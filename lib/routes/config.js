var dontHookOn = [
  "auth"
];

Iron.Router.hooks.loggedInFilter = function() {
  var user = Meteor.user();
  
  if (!user) {
    Router.go('auth');
  } else {
    this.next();
  }
};

Router.onBeforeAction('loggedInFilter', {
  except: dontHookOn
});

// Router.configure({
//   loadingTemplate: 'loading',
//   waitOn: function() {
//   }
// })