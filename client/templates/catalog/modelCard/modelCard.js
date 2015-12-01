Template.modelCard.helpers({
    price: function () {
        return Template.currentData().price.toLocaleString("USD");
    }
})