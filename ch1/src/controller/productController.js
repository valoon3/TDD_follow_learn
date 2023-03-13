const productModel = require('../model/Product')
const router = require('express').Router();
const productService = require('../service/productService');

router.get('/', productService.hello);

router.get('/one', productService.one);

router.post('/', productService.createProduct);

router.get('/select', productService.getProduct);

router.use(productService.makeErrorMessage);




module.exports = router;