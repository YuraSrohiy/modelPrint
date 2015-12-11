Meteor.startup(function() {
    if (Meteor.users.find().count() == 0) {
        var id = Accounts.createUser({
            email: "admin@admin.com",
            password: "admin"
        });
        Roles.addUsersToRoles(id, "desinger");
    }
})