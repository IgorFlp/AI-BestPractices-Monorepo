import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CfpController } from './cfp.controller';
import { CfpModule } from './cfp.module';

describe('CfpController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CfpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /cfp', () => {
    it('should return 400 when name is missing', () => {
      return request(app.getHttpServer())
        .post('/cfp')
        .send({
          email: 'test@example.com',
          talkTitle: 'My Talk',
          isGDE: false,
        })
        .expect(400);
    });

    it('should return 400 when email is missing', () => {
      return request(app.getHttpServer())
        .post('/cfp')
        .send({
          name: 'John Doe',
          talkTitle: 'My Talk',
          isGDE: false,
        })
        .expect(400);
    });

    it('should return 400 when email is invalid', () => {
      return request(app.getHttpServer())
        .post('/cfp')
        .send({
          name: 'John Doe',
          email: 'invalid-email',
          talkTitle: 'My Talk',
          isGDE: false,
        })
        .expect(400);
    });

    it('should return 400 when talkTitle is missing', () => {
      return request(app.getHttpServer())
        .post('/cfp')
        .send({
          name: 'John Doe',
          email: 'test@example.com',
          isGDE: false,
        })
        .expect(400);
    });

    it('should return 400 when isGDE is missing', () => {
      return request(app.getHttpServer())
        .post('/cfp')
        .send({
          name: 'John Doe',
          email: 'test@example.com',
          talkTitle: 'My Talk',
        })
        .expect(400);
    });

    it('should return 400 when name is empty', () => {
      return request(app.getHttpServer())
        .post('/cfp')
        .send({
          name: '',
          email: 'test@example.com',
          talkTitle: 'My Talk',
          isGDE: false,
        })
        .expect(400);
    });

    it('should return 201 when payload is valid', () => {
      return request(app.getHttpServer())
        .post('/cfp')
        .send({
          id: '123',
          name: 'John Doe',
          email: 'test@example.com',
          talkTitle: 'My Talk',
          isGDE: false,
        })
        .expect(201);
    });
  });
});
