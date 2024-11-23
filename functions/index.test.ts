import request from 'supertest';
import { appFunction } from './index';

describe('POST /sendEmail', () => {
  it('should send an email and return the email and message', async () => {
    const response = await request(appFunction)
      .post('/sendEmail')
      .send({ email: 'test@example.com', message: 'Hello, world!' })
      .expect(200);

    expect(response.body).toEqual({
      email: 'test@example.com',
      message: 'Hello, world!',
    });
  });
});
