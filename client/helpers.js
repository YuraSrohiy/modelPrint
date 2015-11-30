Template.registerHelper("isDesinger", function() {
    var userId = Meteor.userId();
    if(userId){
        return Roles.userIsInRole(userId, "desinger");
    }
})