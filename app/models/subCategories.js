// MODEL Categories
var mongoose = require('mongoose');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var Category = require('../models/categories.js');

var subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [128, 'sub categories name can have a maximum of 128 char'],
    required: [true, 'sub categories name required']
  },
  // logo: {
  //   type: String,
  //   required: [true, 'sub categories logo required']
  // },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});
var SubCategory = {

  model: mongoose.model('SubCategory', subCategorySchema),

  uploadSubCategoryImage: function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      var file = files.file;
      var tempPath = file.path;
      var targetPath = path.resolve('./public/assets/logos/subCategories/' + file.name);
      fs.rename(tempPath, targetPath, function(err) {
        if (err) {
          throw err;
        }
        console.log("upload complete for sub category: " + file.name);
        return res.json({
          path: 'assets/logos/subCategories/' + file.name
        });
      });
    });
  },

  createSubCategory: function(req, res) {
    SubCategory.model.create(
      req.body,
      function(err, data) {
        if (!err) {
          Category.addSubCategoriesToCategory(req.body.category, data._id, res);
        } else {
          res.send(err);
        }
      });
  },
  findAllSubCategories: function(req, res) {
    SubCategory.model
      .find()
      .populate('category')
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
  updateSubCategory: function(req, res) {
    console.log(req.body);
    SubCategory.model.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  },
  deleteSubCategory: function(req, res) {
    SubCategory.model.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.send(err);
      } else {
        Category.deleteSubCategoryFromCategory(req.params.category_id, req.params.id, res);
      }
    });
  }
};
module.exports = SubCategory;
