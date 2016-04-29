// MODEL TODO
var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
var shopSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [20, 'name can have a maximum of 20 char'],
        required: [true, 'name required'],
    },
    address: {
        type: String,
        maxlength: [40, 'address can have a maximum of 40 char'],
        required: [true, 'address required']
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },/*
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: [true, 'city required']
    },*/
    coordinates: {
        type: GeoJSON.Feature,
        /*required: [true, 'coordinates required']*/
    },
    catchment_area_radius: {
        type: Number
    }
});
var Shop = {

    model: mongoose.model('Shop', shopSchema),

    createShop: function (req, res) {
        Shop.model.create({
            name: req.body.name,
            address: req.body.address,
            /*brand_id: req.body.brand_id,*/
            /*city_id: req.body.city_id,*/
            catchment_area_radius: req.body.catchment_area_radius
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
    linkBrand: function(req, res){
        Shop.model.findByIdAndUpdate(req.params.id, {
            brand_id: req.body.brand_id,
        }, function () {
            res.sendStatus(200);
        })
    },
    findAllShops: function (req, res) {
        Shop.model
            .find()
            .populate('Brand')
            .exec(function (err, data) {
                if (!err) {
                    res.send(data);
                } else {
                    console.log(err);
                    res.sendStatus(400);
                }
            });
    },
    updateShop: function (req, res) {
        Shop.model.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            address: req.body.address,
            catchment_area_radius: req.body.catchment_area_radius
        }, function () {
            res.sendStatus(200);
        })
    },
    deleteShop: function (req, res) {
        Shop.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}
module.exports = Shop;