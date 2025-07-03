import { PrismaClient, OrganizationRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // --- Clean up existing data ---
    await prisma.membership.deleteMany({});
    await prisma.organization.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('Cleaned up existing data.');

    // --- Create Super Admin User ---
    const superAdminPassword = await bcrypt.hash('superadminpassword', 10);
    const superAdmin = await prisma.user.create({
        data: {
            email: 'superadmin@example.com',
            name: 'Super Admin',
            password: superAdminPassword,
            emailVerified: true,
            isSuperAdmin: true,
        },
    });
    console.log('Created super admin user:', superAdmin.email);

    // --- Create Regular User ---
    const userPassword = await bcrypt.hash('userpassword', 10);
    const regularUser = await prisma.user.create({
        data: {
            email: 'user@example.com',
            name: 'Regular User',
            password: userPassword,
            emailVerified: true,
        },
    });
    console.log('Created regular user:', regularUser.email);

    // --- Create an Organization ---
    const organization = await prisma.organization.create({
        data: {
            name: 'Test Organization',
        },
    });
    console.log('Created organization:', organization.name);

    // --- Add Users to the Organization as Members ---
    await prisma.membership.create({
        data: {
            organizationId: organization.id,
            userId: superAdmin.id,
            role: OrganizationRole.OWNER,
        },
    });
    console.log(`Added ${superAdmin.email} to ${organization.name} as OWNER.`);

    await prisma.membership.create({
        data: {
            organizationId: organization.id,
            userId: regularUser.id,
            role: OrganizationRole.MEMBER,
        },
    });
    console.log(`Added ${regularUser.email} to ${organization.name} as MEMBER.`);

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
