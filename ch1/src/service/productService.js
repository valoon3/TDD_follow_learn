const productModel = require('../model/Product');

exports.hello = (req, res) => {
  res.send('product page index! open');
}

exports.one = (req, res) => {
  res.send('product page one! open');
};

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
  } catch(err) {
    console.error(err);
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const selectedAllProduct = await productModel.find({});
    res.status(200).json(selectedAllProduct);
  } catch(err) {
    console.error(err);
    next(err);
  }
}

exports.getProductById = async (req, res, next) => {
  try {
    const selectedOneProduct = await productModel.findById(req.params.productId);

    if(selectedOneProduct) {
      res.status(200).json(selectedOneProduct);
    } else {
      res.status(404).send();
    }
    // selectedOneProduct ? res.status(200).json(selectedOneProduct) : res.status(404).json(null);

  } catch(err) {
    console.error(err);
    res.status(404);
    next(err);
  }
}


// 에러 메시지 생산
exports.makeErrorMessage = async (err, req, res, next) => {
  res.status(500).json({ message : err.message });
};