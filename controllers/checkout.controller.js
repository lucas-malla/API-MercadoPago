const mp = require('../modules/mercadoPago');
module.exports = {
    // Step 8
    process: async (req,res) => {
        try {
            let items = req.session.cart.map(item => Object({...item,currency_id:'ARS', unit_price:item.price}))
            let link = await mp(items,12,0)
            // link = link.body.init_point
            return res.json(link.body)
        } catch (error) {
            console.log('Mensaje');
            return res.send(error)
        }
    },
    // Step 9
    feedback: (req, res) => {
        return res.send('Recibimos la respuesta de Mercado Pago')
    }
};