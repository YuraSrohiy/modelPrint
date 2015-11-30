Router.route("/catalog",{
    name:"catalog",
    template: "catalog",
    layoutTemplate: "layoutMain",
    waitOn:function () {
        return [
            Meteor.subscribe("Models"),
            Meteor.subscribe("Categories")
            ];
    }
})