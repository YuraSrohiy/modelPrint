Meteor.methods({
    "changeUserRole": function (id, isAdmin) {
        var userId = this.userId;
        if(userId && Roles.userIsInRole(userId, "desinger")){
            if(isAdmin){
                Roles.setUserRoles(id, "desinger");
            }else {
                Roles.setUserRoles(id, []);
            }
        }
    }
})