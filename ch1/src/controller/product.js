const productModel = require('../model/Product')
const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.send('안녕하세요');
});

// exports.hello = (req, res) => {
//     res.send('안녕하세요!!!');
// }

// exports.createProduct = (req, res, next) => {
//     productModel.create(req.body);
// }

module.exports = router;