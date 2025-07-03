"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("../src/app.module");
const db_1 = require("db");
describe('AuthController (e2e)', () => {
    let app;
    let prisma;
    // Test user data
    const testUser = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User'
    };
    // JWT token for authenticated requests
    let authToken;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
        // Initialize Prisma client
        prisma = new db_1.PrismaClient();
        // Clean up test data before tests
        await prisma.user.deleteMany({
            where: {
                email: testUser.email,
            },
        });
    });
    afterAll(async () => {
        // Clean up test data after tests
        await prisma.user.deleteMany({
            where: {
                email: testUser.email,
            },
        });
        await prisma.$disconnect();
        await app.close();
    });
    describe('Authentication flow', () => {
        it('should register a new user', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send(testUser)
                .expect(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('email', testUser.email);
        });
        it('should not allow registration with existing email', async () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/register')
                .send(testUser)
                .expect(409);
        });
        it('should login with valid credentials', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: testUser.email,
                password: testUser.password,
            })
                .expect(201);
            expect(response.body).toHaveProperty('access_token');
            expect(typeof response.body.access_token).toBe('string');
            // Save token for later tests
            authToken = response.body.access_token;
        });
        it('should not login with invalid credentials', async () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .post('/auth/login')
                .send({
                email: testUser.email,
                password: 'wrongpassword',
            })
                .expect(401);
        });
        it('should access protected route with valid token', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/auth/me')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);
            expect(response.body).toHaveProperty('email', testUser.email);
        });
        it('should not access protected route without token', async () => {
            return (0, supertest_1.default)(app.getHttpServer())
                .get('/auth/me')
                .expect(401);
        });
    });
});
