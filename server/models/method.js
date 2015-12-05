Meteor.methods({
    "addModel" :function(insertObj) {
        var userId = this.userId;
        if(userId && MP.isDesinger(userId)){
            Models.insert(insertObj);
        }
    },
    
    "changeModelStatus": function (id, status) {
        var userId = this.userId;
        if(userId && MP.isDesinger(userId)){
            if(status === "active" || status === "archived"){
                Models.update({_id: id}, {$set:{status: status}});
            }
        }
    },
    
    "removeModel": function (id) {
        var userId = this.userId;
        if(userId && MP.isDesinger(userId)){
            Models.remove({_id: id});
        }
    },
    
    "updateModel": function (id, insertObj) {
        var userId = this.userId;
        if(userId && MP.isDesinger(userId)){
            Models.update({_id: id}, {$set:insertObj});
        }
    }
})