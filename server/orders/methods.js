Meteor.methods({
    "createOrder": function (orderObj) {
        var userId = this.userId;
        if(userId && (orderObj.owner === userId) ){
            orderObj.status = "packing";
            Orders.insert(orderObj);
            Meteor.users.update({_id:userId}, {$set:{cart:[]}})
        }
    }
})