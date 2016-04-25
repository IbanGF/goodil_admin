// MODEL TODO
var mongoose = require('mongoose');

var fs = require('fs');
var Converter = require("csvtojson").Converter;
var csvConverter = new Converter({
    toArrayString: true,
    workerNum: 2,
    constructResult: false
});

// GEOCODIO
var Geocodio = require('geocodio');
var config = {
    api_key: '5d8f5731ed5231606e10f7326a330fdf72d2903'
}
var geocodio = new Geocodio(config);

var BVCollection = new mongoose.Schema({
    url: String,
    text: String,
    id: Number
}, {
    collection: 'collection_bv'
});

var BV = {

    model: mongoose.model('BV', BVCollection),

    addBVFile: function (req, res) {
        fs.writeFile('public/bv/bv.csv', req.body.fileContent, "utf8", function (err) {
            if (err) throw err;
            console.log(req.body.fileName + ' saved! in : public/bv/' + req.body.fileName);
            var readStream = fs.createReadStream('public/bv/bv.csv');
            var writeStream = fs.createWriteStream('public/bv/bv.json');
            csvConverter.on("end_parsed", function () {
                res.sendStatus(200); //here is your result json object 
            });
            readStream.pipe(csvConverter).pipe(writeStream);
        });
    },

    geocodeCities: function (req, res) {
        BV.model.find({}, 'LIBGEO', function (err, data) {
            var cities = [];
            var obj = JSON.parse(JSON.stringify(data));
            for (var i = 0; i < obj.length; i++) {
                console.log(obj[i].LIBGEO + ", France");
                cities.push(obj[i].LIBGEO + ", France");
            }
            geocodio.post('geocode', cities.slice(0, 101), function (err, response) {
                if (err) throw err;
                res.send(response);
            });
        });
    },

    findAllBV: function (req, res) {
        BV.model.find(function (err, data) {
            res.send(data);
        });
    },

    findOneBV: function (req, res) {
        BV.model.find({
            LIBBV2012: req.body.BV
        }, function (err, data) {
            res.send(data);
        });
    }
}

module.exports = BV;