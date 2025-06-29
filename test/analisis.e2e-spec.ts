import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AnalisisController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/analisis/:id (GET) should return 404 for a non-existent project', () => {
    const nonExistentUuid = '123e4567-e89b-12d3-a456-426614174000'; // A valid UUID format, but for a non-existent project
    return request(app.getHttpServer())
      .get(`/analisis/${nonExistentUuid}`)
      .expect(404)
      .expect({ statusCode: 404, message: 'Proyecto con ID "123e4567-e89b-12d3-a456-426614174000" no encontrado', error: 'Not Found' });
  });
});
