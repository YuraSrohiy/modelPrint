Router.route("/editModel/:id",{
    name:"editModel",
    template:"editModel",
    layoutTemplate: "layoutMain",
    waitOn: function () {
        var modelId = this.params.id;
        return [
            Meteor.subscribe("Categories"),
            Meteor.subscribe("Model", modelId)
            ]
    }
})