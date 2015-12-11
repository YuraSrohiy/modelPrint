Template.orders.onRendered(function() {
})

Template.orders.helpers({
    orders: function () {
        return Orders.find();
    }
})
