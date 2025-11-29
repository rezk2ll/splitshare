import type { User } from '../../domain/user/user.entity';

/**
 * Port (interface) for User repository
 * Any database implementation must implement this interface
 */
export interface IUserRepository {
	/**
	 * Finds user by ID
	 */
	findById(id: string): Promise<User | undefined>;

	/**
	 * Finds user by email
	 */
	findByEmail(email: string): Promise<User | undefined>;

	/**
	 * Creates a user
	 */
	create(data: {
		id: string;
		name: string;
		email: string;
		emailVerified?: boolean;
		image?: string | null;
	}): Promise<User>;

	/**
	 * Updates a user
	 */
	update(
		id: string,
		data: {
			name?: string;
			image?: string | null;
			emailVerified?: boolean;
		}
	): Promise<User>;

	/**
	 * Deletes a user
	 */
	delete(id: string): Promise<void>;

	/**
	 * Checks if user exists
	 */
	exists(id: string): Promise<boolean>;
}
