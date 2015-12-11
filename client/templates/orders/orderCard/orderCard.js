Template.orderCard.onRendered(function () {
    $('.tooltipped').tooltip({delay: 15});
    $('select').material_select();
    this.$(".select-dropdown").val(this.data.status);
})

Template.orderCard.helpers({
    getModels: function () {
        var tmplData = Template.currentData();
        var modelIds = Object.keys(tmplData.models);
        return Models.find({_id: {$in:modelIds}}).fetch()
    },
    
    getQuantity: function (id) {
        var tmpl = Template.instance();
        return tmpl.data.models[id].quantity;
    }
})

Template.orderCard.events({
    "change .status-select": function (e,t) {
        var val = t.$(".status-select option:selected").val()
        if(val){
            Meteor.call("changeOrderStatus", t.data._id, val, function (err) {
                if(err){
                    console.log(err);
                    MP.notify("Failed to update status");
                } else {
                    MP.notify("Status changed");
                }
            })
        }
    }
})