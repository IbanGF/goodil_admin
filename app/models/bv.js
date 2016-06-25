// MODEL BV
var mongoose = require('mongoose');

// var fs = require('fs');
// var Converter = require("csvtojson").Converter;
// var csvConverter = new Converter({
//     toArrayString: true,
//     workerNum: 2,
//     constructResult: false
// });
//
// // GEOCODIO
// var Geocodio = require('geocodio');
// var config = {
//     api_key: '5d8f5731ed5231606e10f7326a330fdf72d2903'
// };
// var geocodio = new Geocodio(config);

var BassinDeVieCollection = new mongoose.Schema({
  url: String,
  text: String,
  id: Number
}, {
  collection: 'collection_bv'
});

var BassinDeVie = {

  model: mongoose.model('BassinDeVie', BassinDeVieCollection),

  findAllBVs: function(req, res) {
    var perPage = 100,
      page = Math.max(0, req.param('page'));
    BassinDeVie.model
      .find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function(err, bvs) {
        console.log(bvs);
        res.send(bvs);
      });
  },


  findAllBVsName: function(req, res) {
    BassinDeVie.model.aggregate([{
      $project: {
        _id: 0,
        BVName: 1,
        BVCode: 1
      }
    }, {
      $group: {
        _id: "$BVCode",
        name: {
          $first: "$BVName"
        }
      }
    }, {
      $sort: {
        name: -1
      }
    }], function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      res.send(data);
    });
  },

  findOneBV: function(req, res) {
    console.log('cp :' + req.params.codePostal);
    BassinDeVie.model.findOne({
        CodePostal: Number(req.params.codePostal)
      },
      function(err, data) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log('data : ' + data);
          res.send(data);
        }
      });
  }
};

module.exports = BassinDeVie;
