MP = {};

MP.notify = function(text, time){
    if(time){
        Materialize.toast(text, time);
    } else {
        Materialize.toast(text, 4000);
    }
}

MP.isDesinger = function (userId) {
    if(!userId){
        var userId = Meteor.userId();
    }
    
    if(userId){
        return Roles.userIsInRole(userId, "desinger");
    }
    return false;
}

