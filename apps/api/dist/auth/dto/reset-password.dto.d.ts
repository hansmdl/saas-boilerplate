import { z } from 'zod';
export declare const resetPasswordSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password?: string;
    token?: string;
}, {
    password?: string;
    token?: string;
}>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
