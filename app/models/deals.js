var mongoose = require('mongoose');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var Shop = require('../models/shops.js');

var dealSchema = new mongoose.Schema({
  name: String,
  description: String,
  term: String,
  start_date: {
    type: String,
    required: [true, 'start_date required']
  },
  end_date: {
    type: String,
    required: [true, 'end_date required']
  },
  image: String,
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory'
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date

});

var Deal = {

  model: mongoose.model('Deal', dealSchema),

  uploadDealImage: function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      var file = files.file;
      var tempPath = file.path;
      var targetPath = path.resolve('./public/assets/deals/' + file.name);
      fs.rename(tempPath, targetPath, function(err) {
        if (err) {
          throw err;
        }
        console.log("upload complete for deal: " + file.name);
        return res.json({
          path: 'assets/deals/' + file.name
        });
      });
    });
  },

  createDeal: function(req, res) {
    console.log(req.body);
    Deal.model.create(
      req.body,
      function(err, data) {
        if (err) {
          res.send(err);
        } else {
          Shop.addDealToShop(req.body.shop, data._id, res);
        }
      });
  },
  findAllDeals: function(req, res) {
    Deal.model
      .find()
      .populate('shop')
      .populate({
        path: 'subCategory',
        populate: {
          path: 'category'
        }
      })
      .sort({
        'created_at': 'desc'
      })
      // .populate('subCategory')
      .exec(function(err, deal) {
        if (!err) {
          res.send(deal);
        } else {
          res.send(err);
        }
      });
  },
  findAllDealsInBV: function(req, res) {
    Deal.model
      .find()
      .populate({
        path: 'shop',
        populate: {
          path: 'bassinDeVie',
          match: {
            BVCode: Number(req.params.BVCode)
          }
        }
      })
      .populate({
        path: 'subCategory',
        populate: {
          path: 'category'
        }
      })
      .sort({
        'created_at': 'desc'
      })
      .exec(function(err, deals) {

        deals = deals.filter(function(deal) {
          if (deal.shop.bassinDeVie) {
            return deal;
          }
        });

        console.log(deals);

        if (!err) {
          res.send(deals);
        } else {
          res.send(err);
        }
      });
  },
  findAllDealsInSubCategory: function(req, res) {
    Deal.model
      .find({
        subCategory: req.params.subCategory
      }, function(err, deal) {
        if (!err) {
          res.send(deal);
        } else {
          res.send(err);
        }
      });
  },
  findAllDealsInShop: function(req, res) {
    Deal.model
      .find({
        shop: req.params.shop
      }, function(err, deal) {
        if (!err) {
          console.log(deal);
          res.send(deal);
        } else {
          res.send(err);
        }
      });
  },
  updateDeal: function(req, res) {
    console.log(req.body);
    Deal.model.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  },
  deleteDeal: function(req, res) {
    Deal.model.findOne({
      _id: req.params.id
    }, function(err, deal) {
      if (err) {
        res.send(err);
      } else {
        fs.unlink('./public/' + deal.image, function(err) {
          if (err) console.log(err);
          deal.remove();
          Shop.deleteDealFromShop(req.params.shopID, req.params.id, res);
          console.log('file deleted successfully');
        });
      }
    });
  }
};
module.exports = Deal;
