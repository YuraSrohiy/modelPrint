var submitFunc = function(err, state) {
    if (err) {
        MP.notify(err);
    } else {
        if(state === "signUp"){
            MP.notify("Account Created!");
            var id = console.log(Meteor.userId());
            Roles.addUsersToRoles(id, "customer");
            //Router.go("settings");
            Router.go("orders");
        } else {
            Router.go("orders");
        }
        
    }

};


AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,

    onSubmitHook: submitFunc,
    // Texts
    texts: {
        button: {
            signUp: "Register Now!"
        },
        socialSignUp: "Register",
        socialIcons: {
            "meteor-developer": "fa fa-rocket"
        },
    },
});

