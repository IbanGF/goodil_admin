// ROUTES TODOS
var Brand = require('../models/brands.js');
var Auth = require('../middlewares/authorization.js');
module.exports = function (app) {
    app.get('/brand', Brand.findAllBrands);
    app.post('/brand/uploadBrandImage', Auth.user.isAdministrator, Brand.uploadBrandImage);
    app.post('/brand', Auth.user.isAdministrator, Brand.createBrand);
    app.put('/brand/:id', Auth.user.isAdministrator, Brand.updateBrand);
    app.delete('/brand/:id', Auth.user.isAdministrator, Brand.deleteBrand);
};
