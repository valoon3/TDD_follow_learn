const productController = require('../../src/controller/productController');
const productModel = require('../../src/model/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');

// beforeEach : 여러개의 테스트 안에 공통된 Code가 있다면 beforeEach 안에 넣어서 줄여줄 수 있습니다.

productModel.create = jest.fn(); // 목 함수 생성

let req, res, next;
beforeEach(() => {
    [req, res] = [httpMocks.createRequest(), httpMocks.createResponse()];
    next = null;
})

describe('Product Controller Create', () => {
    beforeEach(() => {
        req.body = newProduct;
    })

    it('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function')
    })
    it('should call Product modelCreate', () => {


        productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })
})