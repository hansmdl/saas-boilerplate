import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendPasswordResetEmail(email: string, token: string) {
    // In a real application, you would use a service like Resend, SendGrid, etc.
    // to send an email with a link like:
    // const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    
    console.log(`
      ================================
      📧 Sending password reset email to: ${email}
      ================================
      Token: ${token}
      ================================
    `);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async sendEmailVerificationEmail(email: string, token: string) {
    // In a real application, you would use a service like Resend, SendGrid, etc.
    // to send an email with a link like:
    // const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
    
    console.log(`
      ================================
      📧 Sending email verification email to: ${email}
      ================================
      Token: ${token}
      ================================
    `);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
