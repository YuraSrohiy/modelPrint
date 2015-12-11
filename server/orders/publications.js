Meteor.publish("orders", function () {
    var userId = this.userId;
    if(userId){
        if(Roles.userIsInRole(userId, "desinger")){
            return Orders.find();
        } else {
            return Orders.find({owner:userId})
        }
    }
    this.ready();
})