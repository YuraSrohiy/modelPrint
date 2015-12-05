Meteor.publish("Models", function() {
    return Models.find();
})

Meteor.publish("Model", function(id) {
    return Models.find({_id: id});
})