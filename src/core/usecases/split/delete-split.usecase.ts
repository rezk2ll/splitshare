import type { ISplitRepository } from '../../ports/repositories/split.repository.port';

/**
 * Use case: Delete a split
 */
export class DeleteSplitUseCase {
	constructor(private splitRepository: ISplitRepository) {}

	async execute(id: string, userId: string): Promise<void> {
		const exists = await this.splitRepository.exists(id);
		if (!exists) {
			throw new Error('Split not found');
		}

		const isOwner = await this.splitRepository.isOwnedByUser(id, userId);
		if (!isOwner) {
			throw new Error('Not authorized to delete this split');
		}

		await this.splitRepository.delete(id);
	}
}
