var Shop = require('../models/shops.js');
var Auth = require('../middlewares/authorization.js');
module.exports = function (app) {
    app.get('/shop', Shop.findAllShops);
    app.post('/shop', Auth.user.isAdministrator, Shop.createShop);
    // app.put('/shopLinkBrand/:id', Shop.linkBrand);
    app.put('/shop/:id', Auth.user.isAdministrator, Shop.updateShop);
    app.delete('/shop/:id/:brand_id', Auth.user.isAdministrator, Shop.deleteShop);
};
