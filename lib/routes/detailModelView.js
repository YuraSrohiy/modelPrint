Router.route("/catalog/:id",{
    name:"detailModelView",
    template:"detailModelView",
    layoutTemplate: "layoutMain",
    waitOn: function () {
        var modelId = this.params.id;
        return [
            Meteor.subscribe("Categories"),
            Meteor.subscribe("Model", modelId)
            ]
    }
})