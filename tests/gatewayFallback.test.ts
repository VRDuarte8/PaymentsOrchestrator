import request from 'supertest';
import app from '../src/app';
import { getAuthToken } from './helpers/auth';

describe('Purchase', () => {
  it('should fallback to gateway2 when gateway1 fails', async () => {
    const token = await getAuthToken();

    const product = await request(app)
      .post('/api/products/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: `Produto de teste ${Date.now()}_${Math.random()}`,
        amount: '10',
      });

    const res = await request(app).post('/api/purchase').send({
      product_id: product.body.id,
      quantity: 1,
      name: 'Teste',
      email: 'testeclient@email.com',
      cardNumber: '4569871236547893',
      cvv: '100',
    });

    expect(res.status).toBe(201);
    expect(res.body.gateway).toBe('gateway2');
  });
});
