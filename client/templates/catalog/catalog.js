Template.catalog.onCreated(function() {
    var self = this;
    self.categories = {};
    self.archiveFilter = {
        archived: new ReactiveVar(false),
        active: new ReactiveVar(true)
    }
    
    var categories = Categories.find().fetch();
    _.each(categories, function(category) {
        self.categories[category._id] = new ReactiveVar(false);
    });
    self.categories.noCategory = new ReactiveVar(false);
});

Template.catalog.onRendered(function () {
    if(MP.isDesinger()){
        $("#active-items")[0].checked = true;
    }
})

Template.catalog.helpers({
    models: function() {
        var query = {};
        var categoryArr = [];
        var categories = Template.instance().categories;
        var archiveFilter = Template.instance().archiveFilter;
        _.each(categories, function (state, id) {
            if (state.get()){
                if(id === "noCategory"){
                    categoryArr.push(undefined);
                } else {
                    categoryArr.push(id);    
                }
            }
        });
        
        if(archiveFilter.active.get() && archiveFilter.archived.get()){
            
        } else if (archiveFilter.active.get()){
            query.status = {$ne:"archived"}
        } else if (archiveFilter.archived.get()){
            query.status = {$ne:"active"}
        }
        
        if(categoryArr.length > 0){
            query.categoryId = {$in: categoryArr}    
        }
        
        return Models.find(query);
    },

    categories: function() {
        return Categories.find();
    },
});

Template.catalog.events({
   'change .filter': function (e, t) {
        var state = e.target.checked,
            id = $(e.target).attr("id");
        t.categories[id].set(state);
   },
   
   "change #active-items": function (e, t) {
       var state = e.target.checked;
       t.archiveFilter.active.set(state);
   },
   
   "change #archived-items": function (e, t) {
       var state = e.target.checked;
       t.archiveFilter.archived.set(state);
   },
   
   "click .add-item-btn": function (e,t) {
       if(MP.isDesinger()){
           Router.go("addModel");
       }
   }, 
   "click .manage-categories": function (e, t) {
       if(MP.isDesinger()){
           Router.go("categoryManage");
       }
   }
});