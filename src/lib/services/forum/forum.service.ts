import type { ForumRepository } from './forum.repository';
import type {
	ForumCategory,
	ForumTopic,
	ForumPost,
	ForumCategoryWithStats,
	ForumTopicWithDetails,
	ForumPostWithAuthor,
	CreateTopicInput,
	UpdateTopicInput,
	CreatePostInput,
	UpdatePostInput,
	TopicFilters,
	PaginationOptions
} from './types';

export class ForumService {
	constructor(private repository: ForumRepository) {}

	// Categories

	async getAllCategories(): Promise<ForumCategory[]> {
		return this.repository.findAllCategories();
	}

	async getCategoryBySlug(slug: string): Promise<ForumCategory | undefined> {
		return this.repository.findCategoryBySlug(slug);
	}

	async getCategoriesWithStats(): Promise<ForumCategoryWithStats[]> {
		return this.repository.findCategoriesWithStats();
	}

	// Topics

	async getTopicById(id: string): Promise<ForumTopicWithDetails | undefined> {
		const topic = await this.repository.findTopicByIdWithDetails(id);
		if (topic) {
			await this.repository.incrementViewCount(id);
		}
		return topic;
	}

	async getTopics(
		filters: TopicFilters,
		pagination: PaginationOptions
	): Promise<ForumTopicWithDetails[]> {
		return this.repository.findTopicsWithFilters(filters, pagination);
	}

	async createTopic(input: CreateTopicInput): Promise<ForumTopic> {
		if (!input.title.trim()) {
			throw new Error('Topic title is required');
		}

		if (input.title.length > 200) {
			throw new Error('Topic title must be 200 characters or less');
		}

		if (!input.content.trim()) {
			throw new Error('Topic content is required');
		}

		const categoryExists = await this.repository.findCategoryBySlug(input.categoryId);
		if (!categoryExists) {
			throw new Error('Invalid category');
		}

		return this.repository.createTopic(input);
	}

	async updateTopic(id: string, userId: string, input: UpdateTopicInput): Promise<ForumTopic> {
		const exists = await this.repository.topicExists(id);
		if (!exists) {
			throw new Error('Topic not found');
		}

		const isOwner = await this.repository.isTopicOwnedByUser(id, userId);
		if (!isOwner) {
			throw new Error('Not authorized to update this topic');
		}

		if (input.title !== undefined) {
			if (!input.title.trim()) {
				throw new Error('Topic title cannot be empty');
			}
			if (input.title.length > 200) {
				throw new Error('Topic title must be 200 characters or less');
			}
		}

		if (input.content !== undefined && !input.content.trim()) {
			throw new Error('Topic content cannot be empty');
		}

		return this.repository.updateTopic(id, input);
	}

	async deleteTopic(id: string, userId: string): Promise<void> {
		const exists = await this.repository.topicExists(id);
		if (!exists) {
			throw new Error('Topic not found');
		}

		const isOwner = await this.repository.isTopicOwnedByUser(id, userId);
		if (!isOwner) {
			throw new Error('Not authorized to delete this topic');
		}

		await this.repository.deleteTopic(id);
	}

	// Posts

	async getPostsByTopic(
		topicId: string,
		pagination: PaginationOptions
	): Promise<ForumPostWithAuthor[]> {
		return this.repository.findPostsByTopicId(topicId, pagination);
	}

	async createPost(input: CreatePostInput): Promise<ForumPost> {
		if (!input.content.trim()) {
			throw new Error('Post content is required');
		}

		const topicExists = await this.repository.topicExists(input.topicId);
		if (!topicExists) {
			throw new Error('Topic not found');
		}

		const topic = await this.repository.findTopicById(input.topicId);
		if (topic?.isLocked) {
			throw new Error('This topic is locked and cannot accept new posts');
		}

		return this.repository.createPost(input);
	}

	async updatePost(id: string, userId: string, input: UpdatePostInput): Promise<ForumPost> {
		const exists = await this.repository.postExists(id);
		if (!exists) {
			throw new Error('Post not found');
		}

		const isOwner = await this.repository.isPostOwnedByUser(id, userId);
		if (!isOwner) {
			throw new Error('Not authorized to update this post');
		}

		if (!input.content.trim()) {
			throw new Error('Post content cannot be empty');
		}

		return this.repository.updatePost(id, input);
	}

	async deletePost(id: string, userId: string): Promise<void> {
		const exists = await this.repository.postExists(id);
		if (!exists) {
			throw new Error('Post not found');
		}

		const isOwner = await this.repository.isPostOwnedByUser(id, userId);
		if (!isOwner) {
			throw new Error('Not authorized to delete this post');
		}

		await this.repository.deletePost(id);
	}
}
