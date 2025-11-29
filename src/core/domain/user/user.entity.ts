/**
 * User domain entity
 */
export class User {
	constructor(
		public readonly id: string,
		public name: string,
		public readonly email: string,
		public emailVerified: boolean,
		public image: string | null,
		public readonly createdAt: Date,
		public updatedAt: Date
	) {}

	/**
	 * Updates user profile
	 */
	updateProfile(data: { name?: string; image?: string | null }): void {
		if (data.name !== undefined) this.name = data.name;
		if (data.image !== undefined) this.image = data.image;
		this.updatedAt = new Date();
	}

	/**
	 * Marks email as verified
	 */
	verifyEmail(): void {
		this.emailVerified = true;
		this.updatedAt = new Date();
	}
}
