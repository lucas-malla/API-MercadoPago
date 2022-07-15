const {index,one} = require('../models/product.model');

module.exports ={
    index: (req,res) => res.render('home',{
        products:index(),
        styles:['home']
    }),
    addCart: (req,res) => {
        // Find Product in DB
           let product = one(req.body.id); 
        // Check product exist in cart
        if(req.session.cart.find(item => item.id == product.id)){
        //Exist and update quantity
            req.session.cart = req.session.cart.map(item => {
                if(item.id == product.id){
                    item.quantity = item.quantity + 1
                }
                return item
            })
            //  Add cart and set quantity
        }else{
            req.session.cart.push({...product,quantity:1});
        }
        return res.redirect('/');
    },
    updateCart: (req,res) => {
        // Check quantity
        if(req.body.quantity == 0 ){
            // Is equal to zero then remove product
            req.session.cart = req.session.cart.filter(item => item.id != req.body.id)
        }else{
            req.session.cart = req.session.cart.map(item => {
                if(item.id == req.body.id){
                    item.quantity = req.body.quantity
                }
                // Update all cart items setting quantity in product selected
                return item
            })

        }
        return res.redirect("/")
    }, 
    removeCart: (req,res) => {
        req.session.cart = req.session.cart.filter(item => item.id != req.body.id)
        return res.redirect("/")
    }
}