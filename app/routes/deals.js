var Deal = require('../models/deals.js');
var Auth = require('../middlewares/authorization.js');
module.exports = function (app) {
    app.get('/deals', Deal.findAllDeals);
    app.post('/deal/uploadDealImage', Auth.user.isAdministrator, Deal.uploadDealImage);
    app.post('/deal', Auth.user.isAdministrator, Deal.createDeal);
    app.put('/deal/:id', Auth.user.isAdministrator, Deal.updateDeal);
    app.delete('/deal/:id', Auth.user.isAdministrator, Deal.deleteDeal);
    app.get('/dealsInSubCategory/:subCategory', Auth.user.isAdministrator, Deal.findAllDealsInSubCategory);
    app.get('/dealsInShop/:shop', Auth.user.isAdministrator, Deal.findAllDealsInShop);
};
