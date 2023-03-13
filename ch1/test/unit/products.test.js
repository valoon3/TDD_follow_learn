const productModel = require('../../src/model/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProduct = require('../data/all-product.json');
const productService = require('../../src/service/productService');

// beforeEach : 여러개의 테스트 안에 공통된 Code가 있다면 beforeEach 안에 넣어서 줄여줄 수 있습니다.

productModel.create = jest.fn(); // 목 함수 생성
productModel.find = jest.fn();

let req, res, next;
beforeEach(() => {
    [req, res] = [httpMocks.createRequest(), httpMocks.createResponse()];
    next = jest.fn();
})

describe('Product Controller Create', () => {
    beforeEach(() => {
        req.body = newProduct;
    })

    // 테스트 하고자 하는 함수가 존재하는가 테스트
    test('should have a createProduct function', () => {
        expect(typeof productService.createProduct).toBe('function');
    });

    test('should call Product modelCreate', () => {
        // productService.createProduct() 를 실행하였을 때 productModel.create 가 함께 실행되는가(toBeCalledWith)
        productService.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    });

    test('should return 201 response code', async () => {
        await productService.createProduct(req, res, next);

        // res.statusCode 의 값이 일치하는지 확인
        expect(res.statusCode).toBe(201);

        // res._isEndCalled() 로 res 응답이 끝나면 true 를 출력하고 toBeTruthy 를 통해서 true 로 일치하는지 확인
        expect(res._isEndCalled()).toBeTruthy();
    });

    test('should return json body in response', async () => {
        // productModel.create 를 실행했을때 return 되는 값을 임의로 지정해준다.
        productModel.create.mockReturnValue(newProduct);

        await productService.createProduct(req, res, next);
        // res._getJSONData() 의 값이
        expect(res._getJSONData()).toStrictEqual(newProduct);
    });

    test('should handle errors', async () => {
        const errorMessage = { message : 'description property missing' };
        const rejectedPromise = Promise.reject(errorMessage);

        productModel.create.mockReturnValue(rejectedPromise);
        await productService.createProduct(req, res, next);

        expect(next).toBeCalledWith(errorMessage);
    });
})


describe('Product Controller Get', () => {

    test('should have a getProduct function', () => {
        expect(typeof productService.getProduct).toBe('function');
    });

    test('should call ProductModel .fine({})', async () => {
        await productService.getProduct(req, res, next);
        expect(productModel.find).toHaveBeenCalledWith({});
    });

    test('should return response 200 status code ', async () => {
        await productService.getProduct(req, res, next);
        expect(res.statusCode).toBe(200);

        console.log(res._isEndCalled());

        expect(res._isEndCalled).toBeTruthy();
    });

    test('should return json body in response', async () => {
        productModel.find.mockReturnValue(allProduct);
        await productService.getProduct(req, res, next);

        expect(res._getJSONData()).toStrictEqual(allProduct)
    });

    test('should handle error ', async () => {
        const errorMessage = { message : 'Error finding product data'};
        const rejectedPromise = Promise.reject(errorMessage);

        productModel.find.mockReturnValue(rejectedPromise);
        await productService.getProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });

});