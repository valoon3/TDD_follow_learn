const request = require('supertest');
const app = require('../../src/server');

const newProductData = require('../data/new-product.json');

test('POST /api/products', async () => {
  const response = await request(app)
      .post('/api/product')
      .send(newProductData);

  expect(response.statusCode).toBe(201)
  expect(response.body.name).toBe(newProductData.name)
  expect(response.body.description).toBe(newProductData.description)
});

test('should return 500 on POST /api/product', async () => {
  const response = await request(app)
      .post('/api/product')
      .send({ name : 'phone' });

  expect(response.statusCode).toBe(500);

  expect(response.body).toStrictEqual({ message: 'Product validation failed: description: Path `description` is required.' });
});