/**
 * SplitDay domain entity
 */
export class SplitDay {
	constructor(
		public readonly id: string,
		public readonly splitId: string,
		public dayNumber: number,
		public name: string,
		public isRestDay: boolean,
		public readonly createdAt: Date,
		public updatedAt: Date
	) {}

	/**
	 * Validates day number
	 */
	static validateDayNumber(dayNumber: number): void {
		if (dayNumber < 1) {
			throw new Error('Day number must be positive');
		}
	}

	/**
	 * Validates day name
	 */
	static validateName(name: string): void {
		if (!name.trim()) {
			throw new Error('Day name is required');
		}
	}
}
