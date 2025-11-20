import { describe, it, expect, vi } from 'vitest';

// Mock dependencies
vi.mock('$lib/server/db', () => ({
	db: {
		select: vi.fn().mockReturnThis(),
		from: vi.fn().mockReturnThis(),
		innerJoin: vi.fn().mockReturnThis(),
		leftJoin: vi.fn().mockReturnThis(),
		where: vi.fn().mockReturnThis(),
		groupBy: vi.fn().mockReturnThis(),
		orderBy: vi.fn().mockResolvedValue([])
	}
}));

vi.mock('$lib/server/rate-limit', () => ({
	rateLimit: vi.fn().mockResolvedValue({
		success: true,
		remaining: 100,
		reset: new Date()
	}),
	feedLimiter: {},
	rateLimitError: vi.fn()
}));

describe('page.server', () => {
	describe('load function', () => {
		it('should return default splits and user data', async () => {
			const { load } = await import('../../../src/routes/+page.server');

			const mockEvent = {
				request: new Request('http://localhost'),
				locals: { user: { id: 'user-123', name: 'Test User' } },
				params: {},
				url: new URL('http://localhost'),
				route: { id: '/' as const },
				isDataRequest: false,
				isSubRequest: false,
				isRemoteRequest: false,
				fetch: global.fetch,
				platform: undefined,
				cookies: {} as never,
				setHeaders: vi.fn(),
				getClientAddress: () => '127.0.0.1',
				parent: vi.fn().mockResolvedValue({}),
				depends: vi.fn(),
				untrack: <T extends string[]>(...deps: T) => deps,
				tracing: {
					attributes: new Map()
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			const result = await load(mockEvent);

			expect(result).toHaveProperty('defaultSplits');
			expect(result).toHaveProperty('user');
			expect(result).toHaveProperty('appliedFilter');
		});

		it('should handle difficulty filter from query params', async () => {
			const { load } = await import('../../../src/routes/+page.server');

			const mockEvent = {
				request: new Request('http://localhost?difficulty=beginner'),
				locals: { user: null },
				params: {},
				url: new URL('http://localhost?difficulty=beginner'),
				route: { id: '/' as const },
				isDataRequest: false,
				isSubRequest: false,
				isRemoteRequest: false,
				fetch: global.fetch,
				platform: undefined,
				cookies: {} as never,
				setHeaders: vi.fn(),
				getClientAddress: () => '127.0.0.1',
				parent: vi.fn().mockResolvedValue({}),
				depends: vi.fn(),
				untrack: <T extends string[]>(...deps: T) => deps,
				tracing: {
					attributes: new Map()
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			const result = await load(mockEvent);

			expect(result).toBeDefined();
			expect(result).not.toBeUndefined();
			expect((result as { appliedFilter: string }).appliedFilter).toBe('beginner');
		});

		it('should return null user when not authenticated', async () => {
			const { load } = await import('../../../src/routes/+page.server');

			const mockEvent = {
				request: new Request('http://localhost'),
				locals: { user: null },
				params: {},
				url: new URL('http://localhost'),
				route: { id: '/' as const },
				isDataRequest: false,
				isSubRequest: false,
				isRemoteRequest: false,
				fetch: global.fetch,
				platform: undefined,
				cookies: {} as never,
				setHeaders: vi.fn(),
				getClientAddress: () => '127.0.0.1',
				parent: vi.fn().mockResolvedValue({}),
				depends: vi.fn(),
				untrack: <T extends string[]>(...deps: T) => deps,
				tracing: {
					attributes: new Map()
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			const result = await load(mockEvent);

			expect(result).toBeDefined();
			expect((result as { user: null }).user).toBeNull();
		});
	});
});
