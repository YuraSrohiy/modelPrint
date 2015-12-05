Router.route("/categoryManage",{
    name:"categoryManage",
    template:"categoryManage",
    layoutTemplate: "layoutMain",
    waitOn: function () {
        return [
            Meteor.subscribe("Categories")
            ]
    }
})