Meteor.publish("Categories", function () {
    return Categories.find();
})