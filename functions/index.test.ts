import request from 'supertest';
import { app } from './index';

describe('POST /sendEmail', () => {
  it('should send an email and return the email and message', async () => {
    const response = await request(app)
      .post('/sendEmail')
      .send({ email: 'test@example.com', message: 'Hello, world!' })
      .expect(200);

    expect(response.body).toEqual({
      email: 'test@example.com',
      message: 'Hello, world!',
    });
  });
});
