const productModel = require('../model/Product')
const router = require('express').Router();
const productService = require('../service/productService');

router.get('/', productService.hello);

router.get('/one', productService.one);

// exports.hello = (req, res) => {
//     res.send('안녕하세요!!!');
// }

// exports.createProduct = (req, res, next) => {
//     productModel.create(req.body);
// }

module.exports = router;