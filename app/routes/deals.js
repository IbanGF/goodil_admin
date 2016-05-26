var Deal = require('../models/deals.js');
module.exports = function (app) {
    app.get('/deals', Deal.findAllDeals);
    app.get('/dealsInSubCategory/:subCategory', Deal.findAllDealsInSubCategory);
    app.get('/dealsInShop/:shop', Deal.findAllDealsInShop);
    app.post('/deal', Deal.createDeal);
    app.put('/deal/:id', Deal.updateDeal);
    app.delete('/deal/:id', Deal.deleteDeal);

};
