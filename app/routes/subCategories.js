// ROUTES TODOS
var SubCategory = require('../models/subCategories.js');
var Auth = require('../middlewares/authorization.js');
module.exports = function (app) {
    app.get('/subCategory', SubCategory.findAllSubCategories);
    app.post('/subCategory', Auth.user.isAdministrator, SubCategory.createSubCategory);
    app.put('/subCategory/:id', Auth.user.isAdministrator, SubCategory.updateSubCategory);
    app.delete('/subCategory/:id/:category_id', Auth.user.isAdministrator, SubCategory.deleteSubCategory);
};
