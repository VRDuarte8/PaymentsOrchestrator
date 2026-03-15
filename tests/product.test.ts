import request from 'supertest';
import app from '../src/app';
import { getAuthToken } from './helpers/auth';

describe('Products', () => {
  it('should register a product', async () => {
    const token = await getAuthToken();
    const res = await request(app)
      .post('/api/products/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Produto de teste',
        amount: 10,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
