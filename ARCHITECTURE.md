# Architecture

## Deployment Model

**Web**: SvelteKit with adapter-node (full-stack)
**Mobile**: Static build with adapter-static (frontend only)

Mobile apps cannot contain secrets. All database operations, API keys, and sensitive logic must remain server-side.

## Configuration

```bash
# .env (server-side only)
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
UPSTASH_REDIS_REST_URL=...

# Mobile build
VITE_API_BASE_URL=https://api.yourdomain.com
```

## Form Actions Pattern

Use SvelteKit form actions normally. They work on web via server-side handling, and on mobile via automatic API bridging.

### Server Action

```typescript
// src/routes/splits/new/+page.server.ts
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export const actions = {
	create: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const name = data.get('name');
		const amount = data.get('amount');

		const split = await db.insert(splits).values({
			name,
			amount: Number(amount),
			userId: locals.user.id
		});

		return { success: true, split };
	}
};
```

### Client Form

```svelte
<script>
	import { enhanceForm } from '$lib/api-client';

	let loading = $state(false);
	let error = $state('');

	const handleSubmit = enhanceForm({
		onSubmit: () => {
			loading = true;
			error = '';
		},
		onResult: () => {
			loading = false;
			// Handle success
		},
		onError: (message) => {
			loading = false;
			error = message;
		}
	});
</script>

<form method="POST" action="?/create" use:enhance={handleSubmit}>
	{#if error}
		<p>{error}</p>
	{/if}

	<input name="name" required />
	<input name="amount" type="number" required />
	<button type="submit" disabled={loading}>
		{loading ? 'Creating...' : 'Create Split'}
	</button>
</form>
```

## How It Works

**Web**: Form submits to same server, SvelteKit handles the action server-side
**Mobile**: `enhanceForm` intercepts submission, converts to JSON POST to `${API_BASE_URL}/splits/new?/create`

Both paths use identical server-side action code.

## Data Loading

For GET requests and data loading, use `load` functions normally:

```typescript
// src/routes/splits/+page.server.ts
export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const splits = await db.query.splits.findMany({
		where: eq(splits.userId, locals.user.id)
	});

	return { splits };
}
```

On mobile, since SSR is disabled, data loads client-side via fetch to the backend server.

## Deployment

```bash
# Web/API Server
npm run build
node .svelte-kit/output/server/index.js

# Mobile
VITE_API_BASE_URL=https://api.yourdomain.com npm run build:mobile
npm run mobile:build:android:bundle
```
