import type { ForumCategory, ForumTopic, ForumPost } from '$lib/server/db/schema';

export type { ForumCategory, ForumTopic, ForumPost };

// DTOs and extended types

export interface ForumCategoryWithStats extends ForumCategory {
	topicCount: number;
	postCount: number;
	lastActivity?: {
		topicId: string;
		topicTitle: string;
		userName: string;
		createdAt: Date;
	};
}

export interface ForumTopicWithDetails extends ForumTopic {
	author: {
		id: string;
		name: string;
		image: string | null;
	};
	category: {
		id: string;
		name: string;
		slug: string;
	};
	postCount: number;
	lastPost?: {
		id: string;
		userId: string;
		userName: string;
		createdAt: Date;
	};
}

export interface ForumPostWithAuthor extends ForumPost {
	author: {
		id: string;
		name: string;
		image: string | null;
	};
}

// Input types

export interface CreateTopicInput {
	categoryId: string;
	userId: string;
	title: string;
	content: string;
}

export interface UpdateTopicInput {
	title?: string;
	content?: string;
	isPinned?: boolean;
	isLocked?: boolean;
}

export interface CreatePostInput {
	topicId: string;
	userId: string;
	content: string;
}

export interface UpdatePostInput {
	content: string;
}

// Query options

export interface TopicFilters {
	categoryId?: string;
	userId?: string;
	isPinned?: boolean;
	search?: string;
}

export interface PaginationOptions {
	limit: number;
	offset: number;
}
