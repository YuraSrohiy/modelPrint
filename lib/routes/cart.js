Router.route("/cart", {
    name: "cart",
    template: "cart",
    layoutTemplate: "layoutMain",
    waitOn: function () {
        return [
            Meteor.subscribe("userCart"),
            Meteor.subscribe("currentUser")
            ]
    }
})