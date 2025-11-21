import { fail, redirect } from '@sveltejs/kit';
import { rateLimit, uploadLimiter, rateLimitError } from '$lib/server/rate-limit';
import { createExerciseSchema } from '$lib/schemas/exercise';
import { exerciseService } from '$lib/services/exercises';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	const rateLimitResult = await rateLimit(event, uploadLimiter);
	if (!rateLimitResult.success) {
		throw rateLimitError(rateLimitResult.reset);
	}

	return {};
};

export const actions: Actions = {
	create: async (event) => {
		const rateLimitResult = await rateLimit(event, uploadLimiter);
		if (!rateLimitResult.success) {
			throw rateLimitError(rateLimitResult.reset);
		}

		const formData = await event.request.formData();
		const data = Object.fromEntries(formData);

		let parsedData;
		try {
			parsedData = JSON.parse(data.payload as string);
		} catch {
			return fail(400, { error: 'Invalid form data' });
		}

		const validation = createExerciseSchema.safeParse(parsedData);
		if (!validation.success) {
			return fail(400, {
				error: 'Validation failed',
				errors: validation.error.flatten().fieldErrors
			});
		}

		const validatedData = validation.data;

		await exerciseService.createExercise({
			userId: event.locals.user!.id,
			name: validatedData.name,
			description: validatedData.description,
			difficulty: validatedData.difficulty,
			muscleGroup: validatedData.muscleGroup,
			equipmentType: validatedData.equipmentType,
			imageUrl: validatedData.imageUrl,
			videoUrl: validatedData.videoUrl
		});

		redirect(303, '/splits/new');
	}
};
