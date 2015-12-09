Template.cart.onCreated(function () {
    var cartIds = Meteor.user().cart;
    var models = Models.find({_id:{$in:cartIds}}).fetch();
    var pricesObj = {};
    _.each(models,function (model) {
        pricesObj[model._id] = {
            price: model.price,
            quantity: 1
        }
    });
    this.prices = new ReactiveVar(pricesObj);
});

Template.cart.onRendered(function () {
    $('.collapsible').collapsible({
      accordion : false
    });
})

Template.cart.helpers({
    cart: function () {
        var cartIds = Meteor.user().cart;
        return Models.find({_id:{$in:cartIds}});
    },
    
    totalPrice: function () {
        return calculateTotal(Template.instance());
    },
    
    getPrices: function () {
        return Template.instance().prices;
    }
})

Template.cart.events({
    "submit #applyOrder": function (e, t) {
        e.preventDefault();
        var orderObj = {};
        orderObj.models = t.prices.get();
        orderObj.totalPrice = calculateTotal(t);
        orderObj.owner = Meteor.userId();
        orderObj.ownerData = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            phone: $("#phoneNumber").val(),
            city: $("#cityName").val(),
            street: $("#streetName").val(),
            home: $("#homeNumber").val(),
            flat: $("#flatNumber").val()
        }
        var flag = false;
        _.each(orderObj.ownerData,function(prop) {
           if(!prop && !flag){
               MP.notify("Fill all fields!");
               flag = true;
           } 
        })
        if(flag){
            return
        }
        Meteor.call("createOrder", orderObj, function (err) {
            if(err){
                console.log(err)
                MP.notify("Failed to create order");
            } else{
                Router.go("orders");
                MP.notify("Order created!")
            }
        });
    }
})

var calculateTotal = function(tmpl) {
    var prices = tmpl.prices.get(),
        cartIds = Meteor.user().cart,
        models = Models.find({_id: {$in: cartIds }}).fetch(),
        sum = 0;

    _.each(models, function(model) {
        var modelId = model._id;
        sum += prices[modelId].price * prices[modelId].quantity;
    });
    return sum;
}