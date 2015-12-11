Meteor.publish("currentUser", function () {
    var userId = this.userId;
    return Meteor.users.find({_id: userId});
})

Meteor.publish("users", function() {
    return Meteor.users.find();
})