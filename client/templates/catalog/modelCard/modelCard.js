Template.modelCard.helpers({
    price: function () {
        return Template.currentData().price.toLocaleString("USD");
    }
})

Template.modelCard.events({
    "click .remove-item": function (e, t) {
        e.preventDefault();
        var item = t.data;
        //console.log(item);
        if(item.status === "active"){
            Meteor.call("changeModelStatus", item._id, "archived", function (err) {
                if(err){
                    MP.notify("Failed to archive item");
                } else {
                    MP.notify("Item archived");
                }
            });
        } else {
            Blaze.renderWithData(Template.confirmDeleteModal, item._id, $(".modalWrapper")[0]);
        }
    },
    
    "click .edit-item": function (e, t) {
        if(MP.isDesinger()){
            Router.go("editModel", {id: t.data._id});
        }    
    }
})