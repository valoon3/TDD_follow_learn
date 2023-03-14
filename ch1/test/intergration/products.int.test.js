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

test('GET /api/product', async () => {
  const response = await request(app).get('/api/product');

  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
});

test('INTEGRATION_TEST GET /api/product/:productId', async () => {
  const sampleProductData = {
    _id : '640c23f7144d5e6de7739897',
    description: 'It is new ',
    name: 'phone',
    price: 13,
  };
  const response = await request(app).get('/api/product/' + sampleProductData._id);

  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(sampleProductData.name);
  expect(response.body.price).toBe(sampleProductData.price);
  expect(response.body.description).toBe(sampleProductData.description);
});

test('INTEGRATION_TEST : id doesnt exist : GET /api/product/:productId', async () => {
  const wrongId = '640c23f7144d5e6de7737777';
  const response = await request(app).get('/api/product/' + wrongId);

  expect(response.statusCode).toBe(404);
});

test('INTEGRATION_TEST PUT /api/product/update/:productId', async () => {
  const sampleDataId = '640c357c57ae47fba5f4fe91';
  const response = await request(app)
      .put('/api/product/' + sampleDataId)
      .send({ name : 'update name', description: 'update description'});

  expect(response.statusCode).toBe(200)
  expect(response.body.name).toBe('update name')
  expect(response.body.description).toBe('update description')
});

test('should return 404 on PUT /api/product/', async () => {
  const sampleWrongDataId = '640c357c57ae47fba5f4f999';
  const response = await request(app)
      .put('/api/product/' + sampleWrongDataId)
      .send({ name : 'update name', description: 'update description'});

  expect(response.statusCode).toBe(404);
});