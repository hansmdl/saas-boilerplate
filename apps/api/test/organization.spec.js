import { expect, test, describe, beforeAll, afterAll } from 'vitest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'db';
const request = (await import('supertest')).default;

describe('OrganizationController (e2e)', () => {
    let app;
    let prisma;
    let authToken;
    let userId;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        prisma = app.get(PrismaService);

        // Clean up database before tests
        await prisma.user.deleteMany({});
        await prisma.organization.deleteMany({});

        // 1. Register a new user
        const userEmail = `test-user-${Date.now()}@example.com`;
        const userPassword = 'password123';
        await request(app.getHttpServer())
            .post('/auth/register')
            .send({ email: userEmail, password: userPassword })
            .expect(201);

        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        if (!user) throw new Error('Test user not created');
        userId = user.id;

        // 2. Login to get auth token
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: userEmail, password: userPassword })
            .expect(201);

        authToken = loginResponse.body.access_token;
    });

    afterAll(async () => {
        await prisma.user.deleteMany({});
        await prisma.organization.deleteMany({});
        await app.close();
    });

    test('/organizations (POST) - should create a new organization and make the user the owner', async () => {
        const orgName = 'My Test Organization';
        const response = await request(app.getHttpServer())
            .post('/organizations')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ name: orgName })
            .expect(201);

        expect(response.body.name).toEqual(orgName);

        // Verify in DB
        const membership = await prisma.membership.findFirst({
            where: {
                organizationId: response.body.id,
                userId: userId,
            },
        });
        expect(membership).toBeDefined();
        expect(membership?.role).toEqual('OWNER');
    });
});
