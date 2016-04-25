// MODEL TODO
var mongoose = require('mongoose');
var brandSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [20, 'name can have a maximum of 20 char'],
        required: [true, 'name required']
    },
    description: {
        type: String,
        maxlength: [255, 'description can have a maximum of 255 char']
    },
    logo: {
        type: String,
        required: [true, 'logo required']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    },
});
var Brand = {

    model: mongoose.model('Brand', brandSchema),

    createBrand: function (req, res) {
        Brand.model.create({
            name: req.body.name,
            description: req.body.description,
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
    findAllBrands: function (req, res) {
        Brand.model.find(function (err, data) {
            res.send(data);
        });
    },
    updateBrand: function (req, res) {
        console.log(req.body);
        Brand.model.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            logo: req.body.logo
        }, function () {
            res.sendStatus(200);
        });
    },
    deleteBrand: function (req, res) {
        Brand.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}
module.exports = Brand;