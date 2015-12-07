Template.categoryManage.helpers({
    categories: function () {
        return Categories.find();
    }
});

Template.categoryManage.events({
    "click .add-category-btn": function (e, t) {
        var categories = Categories.find().fetch(),
            newCategory = $("#add-category-input").val().trim(),
            flag = false;
            
        _.each(categories, function (category) {
            if(category.name === newCategory){
                MP.notify("Such category already exists!");
                flag = true;
            }
        });
        if(!flag && newCategory.length>0){
            Meteor.call("addCategory", newCategory, function (err) {
                if(err){
                    MP.notify(err)
                } else {
                    MP.notify("Category successfuly added");
                }
            });
        }
    }
})