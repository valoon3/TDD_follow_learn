const productModel = require('../model/Product')
const router = require('express').Router();
const productService = require('../service/productService');

// router.get('/', productService.hello);
// /product
router.get('/one', productService.one);

router.post('/', productService.createProduct);

router.get('/', productService.getProduct);

router.get('/:productId', productService.getProductById);

router.put('/:productId', productService.updateProduct);

router.use(productService.makeErrorMessage);




module.exports = router;