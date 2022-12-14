import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
    .get('/movies-api')
    .expect(200)
    .expect('[]');
  });

  describe("/movies-api", () => {
    it("GET", () => {
      return request(app.getHttpServer())
      .get("/movies-api")
      .expect(200)
      .expect([]);
    });
    it("POST", () => {
      return request(app.getHttpServer())
        .post("/movies-api")
        .send({
          title: "Test",
          year: 2020,
          genres: ["test"]
        })
        .expect(201);
    });
    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies-api")
        .expect(404);
    });
   });

  describe("/movies-api/:id", () => {
    it("GET 200", () => {
      return request(app.getHttpServer())
        .get("/movies-api/1")
        .expect(200)
    })
    it("PATCH", () => {
      return request(app.getHttpServer())
        .patch("/movies-api/1")
        .send({ year: 2022 })
        .expect(200)
    });
    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies-api/1")
        .expect(200)
    });
  });
});
