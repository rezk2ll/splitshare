import type { ISplitRepository } from '../../ports/repositories/split.repository.port';
import type { UpdateSplitDto } from '../../domain/split/split.dto';
import type { Split } from '../../domain/split/split.entity';
import { Split as SplitEntity } from '../../domain/split/split.entity';

/**
 * Use case: Update an existing split
 */
export class UpdateSplitUseCase {
	constructor(private splitRepository: ISplitRepository) {}

	async execute(id: string, userId: string, input: UpdateSplitDto): Promise<Split> {
		const exists = await this.splitRepository.exists(id);
		if (!exists) {
			throw new Error('Split not found');
		}

		const isOwner = await this.splitRepository.isOwnedByUser(id, userId);
		if (!isOwner) {
			throw new Error('Not authorized to update this split');
		}

		// Validate input if provided
		if (input.title !== undefined) {
			SplitEntity.validateTitle(input.title);
		}

		if (input.difficulty) {
			SplitEntity.validateDifficulty(input.difficulty);
		}

		return this.splitRepository.update(id, input);
	}
}
