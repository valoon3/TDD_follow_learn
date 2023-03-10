const productModel = require('../model/Product');

exports.hello = (req, res) => {
  res.send('product page index! open');
}

exports.one = (req, res) => {
  res.send('product page one! open');
};

exports.createProduct = (req, res, next) => {
  productModel.create(req.body);
};