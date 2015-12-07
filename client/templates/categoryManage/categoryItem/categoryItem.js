Template.categoryItem.onCreated(function () {
    this.editMode = new ReactiveVar(false);
})

Template.categoryItem.events({
    "click .delete-category": function (e, t) {
        var categoryId = t.data._id;
        Meteor.call("deleteCategory", categoryId, function (err) {
            if(err){
                MP.notify(err);
            } else {
                MP.notify("Category successfuly deleted!");
            }
        });
    },
    
    "click .rename-category": function (e, t) {
        t.editMode.set(!t.editMode.get());
        
        setTimeout(function () {
            var input = $("#edit-category-input");
            if (input.length > 0) {
                $('label[for="edit-category-input"]').addClass("active");
                input.val(t.data.name);
            }
        }, 100);
        
    },
    
    "click .edit-category-btn": function (e, t) {
        var categories = Categories.find().fetch(),
            newCategory = $("#edit-category-input").val().trim(),
            flag = false;
            
        _.each(categories, function (category) {
            if(category.name === newCategory){
                MP.notify("Such category already exists!");
                flag = true;
            }
        });
        if(!flag && newCategory.length>0){
            Meteor.call("editCategory",t.data._id, newCategory, function (err) {
                if(err){
                    MP.notify(err)
                } else {
                    MP.notify("Category successfuly edited");
                    t.editMode.set(false);
                }
            });
        }
    }
});

Template.categoryItem.helpers({
    editMode: function () {
        return Template.instance().editMode.get();
    }
})