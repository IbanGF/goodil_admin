// MODEL Brand
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
  updated_at: Date,
  shops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  }]
});
var Brand = {

  model: mongoose.model('Brand', brandSchema),

  createBrand: function(req, res) {
    Brand.model.create(
      req.body,
      function(err) {
        if (!err) {
          res.sendStatus(200);
        } else {
          res.send(err);
        }
      });
  },
  findAllBrands: function(req, res) {
    Brand.model
      .find()
      .populate('shops')
      .exec(function(err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
  },
  updateBrand: function(req, res) {
    Brand.model.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  },
  deleteBrand: function(req, res) {
    Brand.model.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  },
  addShopToBrand: function(brand_id, shop_id, res) {
    Brand.model.findByIdAndUpdate(brand_id, {
        $push: {
          shops: shop_id
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
  deleteShopFromBrand: function(brand_id, shop_id, res) {
    Brand.model.findByIdAndUpdate(brand_id, {
        $pull: {
          shops: shop_id
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
module.exports = Brand;
