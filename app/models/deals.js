var mongoose = require('mongoose');
var dealSchema = new mongoose.Schema({
    name: String,
    description: String,
    term: String,
    start_date: {
        type:Date,
        required: [true, 'start_date required']
    },
    end_date: {
        type:Date,
        required: [true, 'end_date required']
    },
    image: String,
    
    subCategoryId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
    
    shopId: { 
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

    createDeal: function (req, res) {
        Deal.model.create({
            name: req.body.name,
            description: req.body.description,
            term: req.body.term,
            start_date:req.body.start_date,
            end_date:req.body.end_date,
            image:req.body.image,
            subCategoryId: req.body.subCategoryId,
            shopId: req.body.shopId
        }, function (err, data) {
            if (!err) {
                res.send({
                    id: data._id
                });
            } else {
                console.log(err);
                res.sendStatus(400);
            }
        });
    },
    findAllDeals: function (req, res) {
        Deal.model
            .find()
            .populate('Shop')
            .populate('SubCategory')
            .exec(function (err, data) {
                if (!err) {
                    res.send(data);
                } else {
                    console.log(err);
                    res.sendStatus(400);
                }
            });
    },
    updateDeal: function (req, res) {
        console.log(req.body);
        Deal.model.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            term: req.body.term,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            image: req.body.image,
        }, function () {
            res.sendStatus(200);
        });
    },
    deleteDeal: function (req, res) {
        Deal.model.findByIdAndRemove(req.params.id, function () {
            res.sendStatus(200);
        })
    }
}
module.exports = Deal;