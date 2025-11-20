import { vi } from 'vitest';

// Mock SvelteKit environment modules
vi.mock('$env/static/private', () => ({
	DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
	UPSTASH_REDIS_REST_URL: '',
	UPSTASH_REDIS_REST_TOKEN: ''
}));

vi.mock('$env/dynamic/private', () => ({
	env: {
		DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
		UPSTASH_REDIS_REST_URL: '',
		UPSTASH_REDIS_REST_TOKEN: ''
	}
}));

vi.mock('$app/environment', () => ({
	browser: false,
	dev: true,
	building: false,
	version: '0.0.0'
}));
