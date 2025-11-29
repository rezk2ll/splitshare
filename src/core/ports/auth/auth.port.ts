/**
 * Port (interface) for Authentication service
 * Any auth provider must implement this interface
 */

export interface SessionData {
	session: {
		id: string;
		userId: string;
		expiresAt: Date;
		token: string;
	} | null;
	user: {
		id: string;
		name: string;
		email: string;
		emailVerified: boolean;
		image: string | null;
	} | null;
}

export interface IAuthService {
	/**
	 * Gets current session from headers
	 */
	getSession(headers: Headers): Promise<SessionData>;

	/**
	 * Signs in user with email and password
	 */
	signIn(email: string, password: string): Promise<SessionData>;

	/**
	 * Signs up new user
	 */
	signUp(name: string, email: string, password: string): Promise<SessionData>;

	/**
	 * Signs out current user
	 */
	signOut(token: string): Promise<void>;

	/**
	 * Verifies user email
	 */
	verifyEmail(token: string): Promise<void>;
}
