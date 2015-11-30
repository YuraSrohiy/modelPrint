MP = {};

MP.notify = function(text, time){
    $(".toast").hide();
    if(time){
        Materialize.toast(text, time);
    } else {
        Materialize.toast(text, 4000);
    }
}

MP.isDesinger = function (userId) {
    if(userId){
        return Roles.userIsInRole(userId, "desinger");
    }
}

