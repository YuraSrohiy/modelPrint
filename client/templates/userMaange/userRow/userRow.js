Template.userRow.onRendered(function (){
    var user = this.data;
    
    if(Roles.userIsInRole(user._id, "desinger")){
        $("#"+user._id+"admin").prop("checked", true);
    } else {
        $("#"+user._id+"user").prop("checked", true);
    }
})

Template.userRow.helpers({
    getMail: function () {
        return this.emails[0].address;
    }
})

Template.userRow.events({
    "change .radioManage": function (e, t) {
        var user = t.data;
        var state = t.$("#"+user._id+"admin").prop("checked");
        Meteor.call("changeUserRole", user._id, state, function (err) {
            if(err){
                console.log(err);
                MP.notify("Failed to update permission");
            } else {
                MP.notify("Permissions changed");
            }
        });
    }
})