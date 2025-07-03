import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

describe('AppController (Basic e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Crear el módulo de prueba
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Crear la aplicación
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // Cerrar la aplicación
    await app.close();
  });

  // Prueba básica
  it('/ (GET) debería responder con 200', async () => {
    // Realizar la solicitud al servidor
    const response = await request(app.getHttpServer())
      .get('/')
      .expect(200);
    
    // Verificar que la respuesta contenga el texto esperado
    expect(response.text).toBeDefined();
  });
});
