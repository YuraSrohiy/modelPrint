Template.userManage.helpers({
    users: function () {
        return Meteor.users.find().fetch();
    }
})