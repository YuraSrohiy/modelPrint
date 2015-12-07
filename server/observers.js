Categories.find().observeChanges({
    removed: function (id) {
        Models.update({categoryId: id}, {$unset: {categoryId:""}, $set:{status:"archived"}}, {multi:true});
    }
});