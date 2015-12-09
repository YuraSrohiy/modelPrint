Meteor.methods({
    "removeFromCart": function (modelId) {
        var userId = this.userId;
        Meteor.users.update({_id: userId}, {$pull:{cart:modelId}});
    }
})