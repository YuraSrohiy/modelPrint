Meteor.publish("Models", function() {
    return Models.find();
})