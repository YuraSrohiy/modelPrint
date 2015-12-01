Router.route("/addModel",{
    name:"addModel",
    template:"addModel",
    waitOn: function () {
        return [
            Meteor.subscribe("Categories")
            ]
    }
})