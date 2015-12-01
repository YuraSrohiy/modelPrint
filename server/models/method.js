Meteor.methods({
    "addModel" :function(insertObj) {
        var userId = this.userId;
        if(userId && MP.isDesinger(userId)){
            Models.insert(insertObj);
        }
    }
})