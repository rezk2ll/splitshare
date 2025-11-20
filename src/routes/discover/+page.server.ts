import { db } from '$lib/server/db';
import { splits, user, likes, comments } from '$lib/server/db/schema';
import { eq, and, sql, desc } from 'drizzle-orm';
import { rateLimit, feedLimiter, rateLimitError } from '$lib/server/rate-limit';
import { ITEMS_PER_PAGE } from '$lib/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const rateLimitResult = await rateLimit(event, feedLimiter);
	if (!rateLimitResult.success) {
		throw rateLimitError(rateLimitResult.reset);
	}

	const url = new URL(event.request.url);
	const page = parseInt(url.searchParams.get('page') || '1', 10);
	const difficultyFilter = url.searchParams.get('difficulty');

	const whereConditions = [eq(splits.isPublic, true)];

	if (difficultyFilter && ['beginner', 'intermediate', 'advanced'].includes(difficultyFilter)) {
		whereConditions.push(eq(splits.difficulty, difficultyFilter));
	}

	const offset = (page - 1) * ITEMS_PER_PAGE;

	const popularSplits = await db
		.select({
			split: splits,
			author: {
				id: user.id,
				name: user.name,
				image: user.image
			},
			likesCount: sql<number>`cast(count(distinct ${likes.id}) as integer)`,
			commentsCount: sql<number>`cast(count(distinct ${comments.id}) as integer)`,
			isLiked: event.locals.user
				? sql<boolean>`exists(
					select 1 from ${likes}
					where ${likes.splitId} = ${splits.id}
					and ${likes.userId} = ${event.locals.user.id}
				)`
				: sql<boolean>`false`
		})
		.from(splits)
		.innerJoin(user, eq(splits.userId, user.id))
		.leftJoin(likes, eq(splits.id, likes.splitId))
		.leftJoin(comments, eq(splits.id, comments.splitId))
		.where(and(...whereConditions))
		.groupBy(splits.id, user.id, user.name, user.image)
		.orderBy(desc(sql`count(distinct ${likes.id})`), desc(splits.createdAt))
		.limit(ITEMS_PER_PAGE)
		.offset(offset);

	const [{ count }] = await db
		.select({ count: sql<number>`cast(count(*) as integer)` })
		.from(splits)
		.where(and(...whereConditions));

	const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

	return {
		popularSplits,
		currentPage: page,
		totalPages,
		hasMore: page < totalPages,
		user: event.locals.user || null,
		appliedFilter: difficultyFilter
	};
};
