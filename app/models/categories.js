// MODEL Categories
var mongoose = require('mongoose');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [128, 'categories name can have a maximum of 128 char'],
    required: [true, 'categories name required']
  },
  logo: {
    type: String,
    required: [true, 'categories logo required']
  },
  subCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory'
  }],
  deals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deal'
  }]
});

var Category = {

  model: mongoose.model('Category', categorySchema),

  uploadCategoryImage: function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      var file = files.file;
      var tempPath = file.path;
      var targetPath = path.resolve('./public/assets/logos/categories/' + file.name);
      fs.rename(tempPath, targetPath, function(err) {
        if (err) {
          throw err;
        }
        console.log("upload complete for category: " + file.name);
        return res.json({
          path: 'assets/logos/categories/' + file.name
        });
      });
    });
  },

  createCategory: function(req, res) {
    Category.model.create(
      req.body,
      function(err) {
        if (err) {
          res.send(err);
        } else {
          res.sendStatus(200);
        }
      });
  },
  findAllCategories: function(req, res) {
    Category.model
    .find()
    .populate('subCategories')
    .sort({
      'name': 'desc'
    })
    .exec(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  },
  updateCategory: function(req, res) {
    console.log(req.body);
    Category.model.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  },
  deleteCategory: function(req, res) {
    Category.model.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  },
  addSubCategoriesToCategory: function(category_id, subCategory_id, res) {
    Category.model.findByIdAndUpdate(category_id, {
        $push: {
          subCategories: subCategory_id
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
  deleteSubCategoryFromCategory: function(category_id, subCategory_id, res) {
    Category.model.findByIdAndUpdate(category_id, {
        $pull: {
          subCategories: subCategory_id
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
module.exports = Category;
