const express = require('express');
const router = express.Router();
const productController = require('./controller/product')
const mongoose = require('mongoose');

router.get('/', productController.hello);

module.exports = router;