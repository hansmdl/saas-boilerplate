"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("../src/app.module");
// Jest test for AppController
describe('AppController (e2e)', () => {
    let app;
    // Set up the application before tests
    beforeAll(async () => {
        console.log('Setting up app for testing...');
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
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
        const response = await (0, supertest_1.default)(app.getHttpServer())
            .get('/')
            .expect(200);
        console.log(`Response received: ${response.text}`);
        expect(response.text).toContain('Hello World');
    });
});
