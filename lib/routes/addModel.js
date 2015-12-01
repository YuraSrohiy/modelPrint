Router.route("/addModel",{
    name:"addModel",
    template:"addModel",
    layoutTemplate: "layoutMain",
    waitOn: function () {
        return [
            Meteor.subscribe("Categories")
            ]
    }
})