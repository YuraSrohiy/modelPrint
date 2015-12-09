Meteor.publish("Models", function() {
    return Models.find();
})

Meteor.publish("Model", function(id) {
    return Models.find({_id: id});
})

Meteor.publish("userCart", function() {
    var user = Meteor.users.findOne({_id:this.userId});
    
    return Models.find({_id:{$in:user.cart}});
})