Template.editModel.onCreated(function () {
    this.imageUrl = new ReactiveVar("http://imgur.com/ujcnFMc");
})

Template.editModel.onRendered(function () {
    var modelId = Router.current().params.id;
    var model = Models.findOne({_id: modelId});
    console.log()
    
    $("#modelName").val(model.name);
    $('label[for="modelName"]').addClass("active");
    
    $("#modelDescription").val(model.description);
    $('label[for="modelDescription"]').addClass("active");
    
    $("#modelImage").val(model.image);
    $('label[for="modelImage"]').addClass("active");
    
    $("#modelDimensions").val(model.dimensions);
    $('label[for="modelDimensions"]').addClass("active");
    
    if(model.image){
        this.imageUrl.set(model.image);
    }
    $("#modelPrice").val(model.price);
    $('label[for="modelPrice"]').addClass("active");
    
    if(model.categoryId){
        var category = Categories.findOne({_id: model.categoryId});
        $(".category-choose").val(category.name);
    } else {
        $(".category-choose").val("");
    }
    
    
    if(model.status === "archived"){
        $("#archived-item").prop("checked", true);
    } else {
        $("#active-item").prop("checked", true);
    }
    $("select").material_select();
    
});

Template.editModel.helpers({
    imageUrl: function () {
        return Template.instance().imageUrl.get()+"l.png";
    },
    categories: function () {
        return Categories.find();
    }
});

Template.editModel.events({
    'input #modelImage': function (e, t) {
        var url = $("#modelImage").val();
        if(url.trim().length > 0){
            t.imageUrl.set(url);
        }
    },
    'submit #editModelForm': function (e, t) {
        e.preventDefault();
        var insertObj = {};
        insertObj.name = $("#modelName").val();
        insertObj.description = $("#modelDescription").val();
        insertObj.image = $("#modelImage").val();
        insertObj.price = parseFloat($("#modelPrice").val());
        insertObj.categoryId = $(".category-choose option:selected").attr("id");
        insertObj.dimensions = $("#modelDimensions").val();
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
        var id = Router.current().params.id;
        Meteor.call("updateModel", id, insertObj, function (err) {
            if(err){
                console.log(err);
                MP.notify("Update failed");
            } else {
                MP.notify("Model updated!");
                Router.go("catalog");
            }
        });
    }
})