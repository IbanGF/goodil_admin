// MODEL TODO
var GeoJSON = require('mongoose-geojson-schema');
var mongoose = require('mongoose');
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

  createShop: function(req, res) {
    Shop.model.create(
      req.body,
      function(err, data) {
        if (!err) {
          res.sendStatus(200);
        } else {
          res.send(err);
        }
      });
  },
  // linkBrand: function(req, res) {
  //   Shop.model.findByIdAndUpdate(req.params.id, {
  //     brand_id: req.body._id
  //   }, function(err) {
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.sendStatus(200);
  //     }
  //   });
  // },
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
        res.sendStatus(200);
      }
    });
  }
};
module.exports = Shop;
