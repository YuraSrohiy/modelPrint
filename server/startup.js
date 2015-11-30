Meteor.startup(function() {
    if (Meteor.users.find().count() == 0) {
        var id = Accounts.createUser({
            email: "admin@admin.com",
            password: "admin"
        });
        Roles.addUsersToRoles(id, "desinger");
    }
})

InsertModels = function() {
    var data = [{
        name: "Eternal Knot",
        description: "The Buddhist Eternal or Infinity Knot represents the cycle"+
                    "of learning and personal growth. It shows the endlessness of the world, "+ 
                    "there is no beginning or end, only the journey.",
        dimensions: "3x4x0.4",
        price: 6,
        status: "active",
        image: "http://imgur.com/yK9wOAp",
        paintable: true,
        categoryId: '9rWcui7F8gq3G9DR6'
    }, {
        name: "Inner Compass",
        description: "This decorated gyroscope like pendant can freely rotate and spin on 2 axles. This pendent was inspired by my personal practice of yoga and meditation, this piece looks at the concept of trying to stay centered in an ever changing world. The pendent comes out great in the strong plastics offered by shapeways.",
        dimensions: "5.5x5.5x1.5",
        price: 20,
        status: "active",
        image: "http://imgur.com/DGHpLFN",
        paintable: true,
        categoryId: '9rWcui7F8gq3G9DR6'
    }, {
        name: "120-Cell",
        description: "There are six regular convex polytopes in 4D, which are analogous to the five Platonic solids in 3D. This is the fifth, the hyperdodecahedron, a remarkably beautiful object brought to my attention by George Hart. ",
        dimensions: "7x7x7",
        price: 25,
        status: "active",
        image: "http://imgur.com/GHAHPGl",
        paintable: true,
        categoryId:'8PuJh4LT2STPvBjNT'
    }, {
        name: "Borromean Rings Seifert Surface",
        description: "Borromean Rings Seifert Surface",
        dimensions: "5x5x5",
        price: 15,
        status: "active",
        image: "http://imgur.com/R0ybP54",
        paintable: true,
        categoryId:'8PuJh4LT2STPvBjNT'
    }];
    _.each(data, function (item) {
        Models.insert(item);
        console.log("+");
    })
};