var Deal = require('../models/deals.js');
var Auth = require('../middlewares/authorization.js');
module.exports = function (app) {
    app.get('/deals', Deal.findAllDeals);
    app.get('/deals/:BVCode', Deal.findAllDealsInBV);
    app.post('/deal/uploadDealImage', Auth.user.isAdministrator, Deal.uploadDealImage);
    app.post('/deal', Auth.user.isAdministrator, Deal.createDeal);
    app.put('/deal/:id', Auth.user.isAdministrator, Deal.updateDeal);
    app.delete('/deal/:id/:shopID', Auth.user.isAdministrator, Deal.deleteDeal);
    app.get('/dealsInSubCategory/:subCategory', Deal.findAllDealsInSubCategory);
    app.get('/dealsInShop/:shop', Deal.findAllDealsInShop);
};
