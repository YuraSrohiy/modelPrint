Meteor.methods({
    "createOrder": function (orderObj) {
        var userId = this.userId;
        if(userId && (orderObj.owner === userId) ){
            orderObj.status = "packing";
            Orders.insert(orderObj);
            Meteor.users.update({_id:userId}, {$set:{cart:[]}})
        }
    },
    
    "changeOrderStatus": function (id, status) {
        var userId = this.userId;
        if(userId && Roles.userIsInRole(userId, "desinger")){
            Orders.update({_id:id}, {$set:{status: status}});
        }
    }
})