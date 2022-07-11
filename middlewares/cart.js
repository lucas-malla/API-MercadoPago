module.exports =(req,res,next) => {
    if (req.session.cart && !req.session.cart) {
        req.session.cart = []
    }

        req.locals.cart = req.session.cart

    next();
};