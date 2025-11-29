/**
 * Common value objects for the domain
 */

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export class Pagination {
	constructor(
		public readonly limit: number,
		public readonly offset: number
	) {
		if (limit < 1) {
			throw new Error('Limit must be at least 1');
		}
		if (offset < 0) {
			throw new Error('Offset cannot be negative');
		}
	}

	static fromPage(page: number, pageSize: number): Pagination {
		return new Pagination(pageSize, (page - 1) * pageSize);
	}
}

export class Author {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly image: string | null
	) {}
}
