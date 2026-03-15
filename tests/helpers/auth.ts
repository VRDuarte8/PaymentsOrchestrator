import request from 'supertest';
import app from '../../src/app';

export function randomEmail() {
  return `test_${Date.now()}_${Math.random()}@email.com`;
}

export async function getAuthToken() {
  const email = randomEmail();
  const password = '12345';

  await request(app).post('/api/auth/register').send({
    email,
    password,
    role: "ADMIN"
  });

  const login = await request(app).post('/api/auth/login').send({
    email,
    password,
  });

  if(!login.body.token){
    throw new Error("Login failed in test helper");
  }

  return login.body.token;
}
