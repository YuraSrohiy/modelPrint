Template.detailModelView.onCreated(function () {
    this.model = Models.findOne({_id: Router.current().params.id});
});

Template.detailModelView.helpers({
    model: function () {
        return Template.instance().model;
    }
});

Template.detailModelView.events({
    "click .remove-item": function (e, t) {
        e.preventDefault();
        var item = t.model;
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
            Router.go("editModel", {id: t.model._id});
        }    
    },
    
    "click .add-to-cart": function (e, t) {
        var modelId = t.model._id;
        Meteor.call("addToCart", modelId, function (err) {
            if(err){
                MP.notify(err);
            } else{
                MP.notify("Model added to cart");
            }
        });
    }
})