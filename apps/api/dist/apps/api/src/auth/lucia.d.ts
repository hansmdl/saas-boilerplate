import { Lucia } from "lucia";
export declare const lucia: Lucia<Record<never, never>, {
    email: string;
    emailVerified: boolean;
    isSuperAdmin: boolean;
}>;
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}
interface DatabaseUserAttributes {
    email: string;
    emailVerified: boolean;
    isSuperAdmin: boolean;
}
export {};
