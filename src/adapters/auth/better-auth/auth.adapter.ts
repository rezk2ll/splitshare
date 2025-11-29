import type { Auth } from '$lib/server/auth';
import type { IAuthService, SessionData } from '../../../core/ports/auth/auth.port';

/**
 * better-auth adapter for Auth service
 */
export class BetterAuthAdapter implements IAuthService {
	constructor(private auth: Auth) {}

	async getSession(headers: Headers): Promise<SessionData> {
		const sessionData = await this.auth.api.getSession({
			headers
		});

		return {
			session: sessionData?.session
				? {
						id: sessionData.session.id,
						userId: sessionData.session.userId,
						expiresAt: new Date(sessionData.session.expiresAt),
						token: sessionData.session.token
					}
				: null,
			user: sessionData?.user
				? {
						id: sessionData.user.id,
						name: sessionData.user.name,
						email: sessionData.user.email,
						emailVerified: sessionData.user.emailVerified,
						image: sessionData.user.image ?? null
					}
				: null
		};
	}

	async signIn(_email: string, _password: string): Promise<SessionData> {
		// better-auth sign-in logic would go here
		// This is a simplified implementation
		throw new Error('Not implemented - use better-auth API endpoints directly');
	}

	async signUp(_name: string, _email: string, _password: string): Promise<SessionData> {
		// better-auth sign-up logic would go here
		throw new Error('Not implemented - use better-auth API endpoints directly');
	}

	async signOut(_token: string): Promise<void> {
		// better-auth sign-out logic would go here
		throw new Error('Not implemented - use better-auth API endpoints directly');
	}

	async verifyEmail(_token: string): Promise<void> {
		// better-auth email verification logic would go here
		throw new Error('Not implemented - use better-auth API endpoints directly');
	}
}
