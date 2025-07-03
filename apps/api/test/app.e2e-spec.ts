import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

// Jest test for AppController
describe('AppController (e2e)', () => {
  let app: INestApplication;

  // Set up the application before tests
  beforeAll(async () => {
    console.log('Setting up app for testing...');
    
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
    console.log('App initialized for testing');
  });

  // Clean up after tests
  afterAll(async () => {
    if (app) {
      await app.close();
      console.log('App closed after testing');
    }
  });

  // Test the root endpoint
  it('/ (GET) should return Hello World', async () => {
    console.log('Testing / endpoint...');
    
    const response = await request(app.getHttpServer())
      .get('/')
      .expect(200);
    
    console.log(`Response received: ${response.text}`);
    expect(response.text).toContain('Hello World');
  });
});
