import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { EventsController } from './events.controller';
import { EventsModule } from './events.module';

describe('EventsController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EventsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /events', () => {
    it('should return 400 when name is missing', () => {
      return request(app.getHttpServer())
        .post('/events')
        .send({
          address: 'Main St 123',
          capacity: 100,
          date: '2025-12-31',
        })
        .expect(400);
    });

    it('should return 400 when address is missing', () => {
      return request(app.getHttpServer())
        .post('/events')
        .send({
          name: 'Angular Conf',
          capacity: 100,
          date: '2025-12-31',
        })
        .expect(400);
    });

    it('should return 400 when capacity is missing', () => {
      return request(app.getHttpServer())
        .post('/events')
        .send({
          name: 'Angular Conf',
          address: 'Main St 123',
          date: '2025-12-31',
        })
        .expect(400);
    });

    it('should return 400 when capacity is not positive', () => {
      return request(app.getHttpServer())
        .post('/events')
        .send({
          name: 'Angular Conf',
          address: 'Main St 123',
          capacity: -10,
          date: '2025-12-31',
        })
        .expect(400);
    });

    it('should return 400 when date is missing', () => {
      return request(app.getHttpServer())
        .post('/events')
        .send({
          name: 'Angular Conf',
          address: 'Main St 123',
          capacity: 100,
        })
        .expect(400);
    });

    it('should return 201 and store event when payload is valid', async () => {
      const payload = {
        name: 'Angular Conf',
        address: 'Main St 123',
        capacity: 150,
        date: '2025-12-31',
      };

      await request(app.getHttpServer())
        .post('/events')
        .send(payload)
        .expect(201);

      const response = await request(app.getHttpServer())
        .get('/events')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe('Angular Conf');
      expect(response.body[0].capacity).toBe(150);
    });
  });
});
