var BV = require('../models/bv.js');
module.exports = function (app) {
    app.get('/AllBV', BV.findAllBV);
    app.get('/OneBV', BV.findOneBV);
    app.get('/Geocode', BV.geocodeCities);
    app.post('/addBVFile', BV.addBVFile);
}