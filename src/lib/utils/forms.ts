import { superValidate as _superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { z } from 'zod';
import type { RequestEvent } from '@sveltejs/kit';
import type { SuperValidated } from 'sveltekit-superforms';

export async function superValidateClient<T extends z.ZodTypeAny>(
	schema: T
): Promise<SuperValidated<z.infer<T>>> {
	// @ts-expect-error - Type incompatibility between Zod v3 and superforms adapter
	return await _superValidate(zod(schema));
}

export async function superValidateServer<T extends z.ZodTypeAny>(
	event: RequestEvent,
	schema: T
): Promise<SuperValidated<z.infer<T>>> {
	// @ts-expect-error - Type incompatibility between Zod v3 and superforms adapter
	return await _superValidate(event, zod(schema));
}
