// MODEL TODO
var mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [128, 'name can have a maximum of 128 char'],
        required: [true, 'name required']
    },
    logo: {
        type: String,
        required: [true, 'logo required']
    }
});
var Category = {

    model: mongoose.model('Category', categorySchema),

    createCategory: function (req, res) {
        Category.model.create({
            name: req.body.name,
            logo: req.body.logo
        }, function (err, data) {
            if (!err) {
                res.send({
                    id: data._id
                });
            } else {
                console.log(err);
                res.sendStatus(400);
            }
        });
    },
    findAllCategories: function (req, res) {
        Category.model.find(function (err, data) {
            res.send(data);
        });
    },
    updateCategory: function (req, res) {
        console.log(req.body);
        Category.model.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            logo: req.body.logo
        }, function () {
            res.sendStatus(200);
        });
    },
    deleteCategory: function (req, res) {
        Category.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}
module.exports = Category;