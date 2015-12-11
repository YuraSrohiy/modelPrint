Router.route("/userManage", {
    name: "userManage",
    template:"userManage",
    layoutTemplate: "layoutMain",
    waitOn: function () {
        return Meteor.subscribe("users");
    }
})