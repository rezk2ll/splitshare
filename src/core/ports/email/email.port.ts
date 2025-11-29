/**
 * Port (interface) for Email service
 * Any email provider must implement this interface
 */

export interface EmailMessage {
	to: string;
	subject: string;
	html: string;
	from?: string;
}

export interface IEmailService {
	/**
	 * Sends an email
	 */
	send(message: EmailMessage): Promise<void>;

	/**
	 * Sends verification email
	 */
	sendVerificationEmail(to: string, token: string): Promise<void>;

	/**
	 * Sends password reset email
	 */
	sendPasswordResetEmail(to: string, token: string): Promise<void>;
}
