Template.confirmDeleteModal.onRendered(function () {
    $("#confirmDeleteModal").openModal();
});

Template.confirmDeleteModal.events({
    "click .confirm-deletion": function (e, t) {
        Meteor.call("removeModel", t.data, function (err) {
            if(err){
                MP.notify("Failed to delete model");
            } else {
                MP.notify("Model successfuly deleted");
                $("#confirmDeleteModal").closeModal();
            }
        });
    },
    
    "click .cancel-deletion": function (e, t) {
        $("#confirmDeleteModal").closeModal();
    }
})