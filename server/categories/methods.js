Meteor.methods({
    "addCategory": function (name) {
        var userId = this.userId;
        if(userId && MP.isDesinger(userId)){
            Categories.insert({name: name});
        }
    },
    
    "deleteCategory": function (id) {
        var userId = this.userId;
        if(userId && MP.isDesinger(userId)){
            Categories.remove({_id: id});
        }
    },
    
    "editCategory": function (id, newName) {
        var userId = this.userId;
        if(userId && MP.isDesinger(userId)){
            Categories.update({_id: id}, {name: newName});
        }
    }
})