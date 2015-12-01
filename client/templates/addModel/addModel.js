Template.addModel.onCreated(function () {
    this.imageUrl = new ReactiveVar("http://imgur.com/ujcnFMc");
})

Template.addModel.onRendered(function () {
    $("select").material_select();
    $("#archived-item").prop("checked", true);
});

Template.addModel.helpers({
    imageUrl: function () {
        return Template.instance().imageUrl.get()+"l.png";
    },
    categories: function () {
        return Categories.find();
    }
});

Template.addModel.events({
    'input #modelImage': function (e, t) {
        var url = $("#modelImage").val();
        if(url.trim().length > 0){
            t.imageUrl.set(url);
        }
    },
    'submit #addModelForm': function (e, t) {
        e.preventDefault();
        var insertObj = {};
        insertObj.name = $("#modelName").val();
        insertObj.description = $("#modelDescription").val();
        insertObj.image = $("#modelImage").val();
        insertObj.price = parseFloat($("#modelPrice").val());
        insertObj.categoryId = $(".category-choose option:selected").attr("id");
        insertObj.dimensions = $("#modelDimensions").val();
        insertObj.paintable = $("#paintable-check").prop("checked");
        if($("#archived-item").prop("checked")){
            insertObj.status = "archived";
        } else {
            insertObj.status = "active";
        }
        
        if(!insertObj.name){
            MP.notify("Insert Name!");
            return;
        }
        if(isNaN(insertObj.price)){
            MP.notify("Insert correct price!");
        }
        if(insertObj.status === "active"){
            _.each(insertObj, function(val, key) {
                if(key != "paintable"){
                    if(!val){
                        MP.notify("Item will get status archived since some field are not filled");
                        insertObj.status = "archived";
                        return false
                    }
                }
            })
        }
        Meteor.call("addModel", insertObj, function (err) {
            if(err){
                MP.notify("Insert failed");
            } else {
                MP.notify("Model added!");
                Router.go("catalog");
            }
        });
    }
})