"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const app_module_1 = require("../src/app.module");
const db_1 = require("db");
describe('OrganizationController (e2e)', () => {
    let app;
    let prisma;
    // Test user data
    const testUser = {
        email: 'org-test@example.com',
        password: 'Password123!',
        firstName: 'Org',
        lastName: 'Test'
    };
    // Test organization data
    const testOrganization = {
        name: 'Test Organization'
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
        // Register test user and get auth token
        await (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/register')
            .send(testUser)
            .expect(201);
        const loginResponse = await (0, supertest_1.default)(app.getHttpServer())
            .post('/auth/login')
            .send({
            email: testUser.email,
            password: testUser.password,
        })
            .expect(201);
        authToken = loginResponse.body.access_token;
    });
    afterAll(async () => {
        // Clean up test data after tests
        await prisma.organization.deleteMany({
            where: {
                name: testOrganization.name,
            },
        });
        await prisma.user.deleteMany({
            where: {
                email: testUser.email,
            },
        });
        await prisma.$disconnect();
        await app.close();
    });
    describe('Organization operations', () => {
        let organizationId;
        it('should create a new organization', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .post('/organizations')
                .set('Authorization', `Bearer ${authToken}`)
                .send(testOrganization)
                .expect(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('name', testOrganization.name);
            organizationId = response.body.id;
        });
        it('should get user organizations', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get('/organizations')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
        });
        it('should get organization by id', async () => {
            const response = await (0, supertest_1.default)(app.getHttpServer())
                .get(`/organizations/${organizationId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);
            expect(response.body).toHaveProperty('id', organizationId);
            expect(response.body).toHaveProperty('name', testOrganization.name);
        });
    });
});
