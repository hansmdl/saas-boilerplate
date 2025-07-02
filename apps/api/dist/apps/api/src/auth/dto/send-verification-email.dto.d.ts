import { z } from 'zod';
export declare const sendVerificationEmailSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
}, {
    email?: string;
}>;
export type SendVerificationEmailDto = z.infer<typeof sendVerificationEmailSchema>;
