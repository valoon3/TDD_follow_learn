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
  } catch(err) {
    console.error(err);
    next(err);
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const resultProduct = await productModel.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new : true }
    )

    if(resultProduct) {
      res.status(200).json(resultProduct);
    } else {
      res.status(404).json({message: 'no date in this id'});
    }
  } catch(err) {
    console.error(err);
    next(err);
  }
};

exports.deleteProduct = (req, res, next) => {

}


// 에러 메시지 생산
exports.makeErrorMessage = async (err, req, res, next) => {
  res.status(500).json({ message : err.message });
};