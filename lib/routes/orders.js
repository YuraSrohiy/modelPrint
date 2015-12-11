Router.route("/orders",{
    name: "orders",
    template: "orders",
    layoutTemplate: "layoutMain",
    waitOn: function () {
        return [
            Meteor.subscribe("orders"),
            Meteor.subscribe("Models")
            ]
    }
})