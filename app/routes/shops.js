var Shop = require('../models/shops.js');
var Auth = require('../middlewares/authorization.js');
module.exports = function (app) {
    app.get('/shop', Shop.findAllShops);
    app.get('/shop/:BVCode', Shop.findAllDealsInBV);
    app.get('/shop/:id', Shop.findOneShop);
    app.post('/shop/uploadShopImage', Auth.user.isAdministrator, Shop.uploadShopImage);
    app.post('/shop', Auth.user.isAdministrator, Shop.createShop);
    app.put('/shop/:id', Auth.user.isAdministrator, Shop.updateShop);
    app.delete('/shop/:id/:brand_id', Auth.user.isAdministrator, Shop.deleteShop);
};
