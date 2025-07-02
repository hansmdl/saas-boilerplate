"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lucia = void 0;
const lucia_1 = require("lucia");
const adapter_prisma_1 = require("@lucia-auth/adapter-prisma");
const db_1 = require("db");
const client = new db_1.PrismaClient();
const adapter = new adapter_prisma_1.PrismaAdapter(client.session, client.user);
exports.lucia = new lucia_1.Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email,
            emailVerified: attributes.emailVerified,
            isSuperAdmin: attributes.isSuperAdmin
        };
    }
});
//# sourceMappingURL=lucia.js.map