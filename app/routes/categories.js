// ROUTES TODOS
var Category = require('../models/categories.js');
var Auth = require('../middlewares/authorization.js');
module.exports = function (app) {
    app.get('/category', Category.findAllCategories);
    app.post('/category/uploadCategoryImage', Auth.user.isAdministrator, Category.uploadCategoryImage);
    app.post('/category', Auth.user.isAdministrator, Category.createCategory);
    app.put('/category/:id', Auth.user.isAdministrator, Category.updateCategory);
    app.delete('/category/:id', Auth.user.isAdministrator, Category.deleteCategory);
};
