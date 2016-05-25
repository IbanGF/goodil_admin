// ROUTES TODOS
var Category = require('../models/categories.js');
module.exports = function (app) {
    app.get('/category', Category.findAllCategories);
    app.post('/category', Category.createCategory);
    app.put('/category/:id', Category.updateCategory);
    app.delete('/category/:id', Category.deleteCategory);
};
