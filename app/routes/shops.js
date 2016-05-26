var Shop = require('../models/shops.js');
module.exports = function (app) {
    app.get('/shop', Shop.findAllShops);
    app.post('/shop', Shop.createShop);
    // app.put('/shopLinkBrand/:id', Shop.linkBrand);
    app.put('/shop/:id', Shop.updateShop);
    app.delete('/shop/:id/:brand_id', Shop.deleteShop);
};
