Router.route("/auth", {
   name: "auth",
   template: "auth",
   action: function () {
       if(Meteor.user()){
           Router.go("orders");
       }
       this.render("auth");
   }
});

Router.route('/', function () {
  this.redirect('/orders');
});