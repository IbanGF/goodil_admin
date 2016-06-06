// MODEL TODO
var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var Brand = require('../models/brands.js');
var shopSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [60, 'name can have a maximum of 60 char'],
    required: [true, 'name required'],
  },
  address: {
    type: Array,
    required: [true, 'address required']
  },
  logo: {
    type: String,
    required: [true, 'logo required']
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  bassinDeVie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BassinDeVie'
  },
  point: mongoose.Schema.Types.Point,
  catchment_area_radius: {
    type: Number
  }
});
var Shop = {

  model: mongoose.model('Shop', shopSchema),

  uploadShopImage: function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      var file = files.file;
      var tempPath = file.path;
      var targetPath = path.resolve('./public/assets/logos/shops/' + file.name);
      fs.rename(tempPath, targetPath, function(err) {
        if (err) {
          throw err;
        }
        console.log("upload complete for Shop: " + file.name);
        return res.json({
          path: 'assets/logos/shops/' + file.name
        });
      });
    });
  },

  createShop: function(req, res) {
    Shop.model.create(
      req.body,
      function(err, data) {
        if (!err) {
          Brand.addShopToBrand(req.body.brand, data._id, res);
        } else {
          res.send(err);
        }
      });
  },
  findAllShops: function(req, res) {
    Shop.model
      .find()
      .populate('brand')
      .populate('bassinDeVie')
      .exec(function(err, data) {
        if (!err) {
          res.send(data);
        } else {
          res.send(err);
        }
      });
  },
  updateShop: function(req, res) {
    Shop.model.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  },
  deleteShop: function(req, res) {
    Shop.model.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.send(err);
      } else {
        Brand.deleteShopFromBrand(req.params.brand_id, req.params.id, res);
      }
    });
  }
};
module.exports = Shop;
