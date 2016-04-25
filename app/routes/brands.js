// ROUTES TODOS
var Brand = require('../models/brands.js');
module.exports = function (app) {
    app.get('/brand', Brand.findAllBrands);
    app.post('/brand', Brand.createBrand);
    app.put('/brand/:id', Brand.updateBrand);
    app.delete('/brand/:id', Brand.deleteBrand);

}