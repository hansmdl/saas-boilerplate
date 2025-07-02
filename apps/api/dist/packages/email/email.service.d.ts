export declare class EmailService {
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
    sendEmailVerificationEmail(email: string, token: string): Promise<void>;
}
