// ROUTES TODOS
var SubCategory = require('../models/subCategories.js');
module.exports = function (app) {
    app.get('/subCategory', SubCategory.findAllSubCategories);
    app.post('/subCategory', SubCategory.createSubCategory);
    app.put('/subCategory/:id', SubCategory.updateSubCategory);
    app.delete('/subCategory/:id/:category_id', SubCategory.deleteSubCategory);
};
