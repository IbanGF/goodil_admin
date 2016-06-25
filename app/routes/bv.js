var BassinDeVie = require('../models/bv.js');
module.exports = function (app) {
    app.get('/findAllBVs/:page', BassinDeVie.findAllBVs);
    app.get('/findAllBVsName', BassinDeVie.findAllBVsName);
    app.get('/findOneBV/:codePostal', BassinDeVie.findOneBV);
};
