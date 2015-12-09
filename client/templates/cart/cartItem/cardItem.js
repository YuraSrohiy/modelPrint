Template.cartItem.onCreated(function() {
   this.quantity = new ReactiveVar(1);
   
});

Template.cartItem.helpers({
    wholePrice: function () {
        var tmpl = Template.instance();
        return this.cart.price * tmpl.quantity.get();
    }
});

Template.cartItem.events({
    "change .quantity-counter": function (e, t) {
        var quantity = t.$(".quantity-counter").val();
        t.quantity.set(quantity);
        var pricesObj = t.data.prices.get();
        pricesObj[t.data.cart._id].quantity = quantity;
        t.data.prices.set(pricesObj);
    },
    
    "submit #buyForm": function (e, t) {
        e.preventDefault();
    },
    
    "click .delete-from-cart": function (e, t) {
        var id = t.data.cart._id;
        Meteor.call("removeFromCart", id, function (err) {
            if(err){
                console.log(err);
                MP.notify("Model remove failed");
            } else {
                MP.notify("Model removed from cart!");
            }
        });
    }
})