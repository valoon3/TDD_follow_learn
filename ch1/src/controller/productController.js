const productModel = require('../model/Product')
const router = require('express').Router();
const productService = require('../service/productService');

router.get('/', productService.hello);

router.get('/one', productService.one);

router.post('/', productService.createProduct);

router.use((error, req, res, next) => {
  res.status(500).json({ message : error.message });
});



module.exports = router;