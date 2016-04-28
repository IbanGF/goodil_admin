var Deal = require('../models/deals.js');
module.exports = function (app) {
    app.get('/deal', Deal.findAllDeals);
    app.post('/deal', Deal.createDeal);
    app.put('/deal/:id', Deal.updateDeal);
    app.delete('/deal/:id', Deal.deleteDeal);

}