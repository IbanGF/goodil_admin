// MODEL Categories
var mongoose = require('mongoose');
var Category = require('../models/categories.js');

var subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [128, 'sub categories name can have a maximum of 128 char'],
    required: [true, 'sub categories name required']
  },
  logo: {
    type: String,
    required: [true, 'sub categories logo required']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});
var SubCategory = {

  model: mongoose.model('SubCategory', subCategorySchema),

  createSubCategory: function(req, res) {
    SubCategory.model.create(
      req.body,
      function(err, data) {
        if (!err) {
          Category.addCategorySubCategories(req.body.category, data._id, res);
        } else {
          res.send(err);
        }
      });
  },
  findAllSubCategories: function(req, res) {
    SubCategory.model
      .find()
      .populate('category')
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
        Category.deleteCategorySubCategory(req.params.category_id, req.params.id, res);
      }
    });
  }
};
module.exports = SubCategory;
