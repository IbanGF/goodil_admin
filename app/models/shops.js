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
  deals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deal'
  }],
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
      .populate('deals')
      .sort({
        'name': 'desc'
      })
      .exec(function(err, data) {
        if (!err) {
          res.send(data);
        } else {
          res.send(err);
        }
      });
  },
  findAllShopsInBV: function(req, res) {
    Shop.model
      .find()
      .populate('brand')
      .populate({
        path: 'bassinDeVie',
        match: {
          BVCode: Number(req.params.BVCode)
        }
      })
      .populate('deals')
      .sort({
        'name': 'desc'
      })
      .exec(function(err, shops) {

        shops = shops.filter(function(shop) {
          if (shop.bassinDeVie) {
            return shop;
          }
        });

        if (!err) {
          res.send(shops);
        } else {
          res.send(err);
        }
      });
  },
  findOneShop: function(req, res) {
    Shop.model
      .findById(req.params.id)
      .populate('brand')
      .populate('bassinDeVie')
      .populate('deals')
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
  },
  addDealToShop: function(shop_id, deal_id, res) {
    Shop.model.findByIdAndUpdate(shop_id, {
        $push: {
          deals: deal_id
        }
      },
      function(err) {
        if (err) {
          res.send(err);
        } else {
          res.sendStatus(200);
        }
      });
  },
  deleteDealFromShop: function(shopId, dealId, res) {
    Shop.model.findByIdAndUpdate(shopId, {
        $pull: {
          deals: dealId
        }
      },
      function(err) {
        if (err) {
          res.send(err);
        } else {
          res.sendStatus(200);
        }
      });
  }
};
module.exports = Shop;
