import type { ISplitRepository } from '../../ports/repositories/split.repository.port';
import type { SplitWithDetailsDto } from '../../domain/split/split.dto';

/**
 * Use case: Get split by ID with details
 */
export class GetSplitUseCase {
	constructor(private splitRepository: ISplitRepository) {}

	async execute(id: string, currentUserId?: string): Promise<SplitWithDetailsDto | undefined> {
		return this.splitRepository.findByIdWithDetails(id, currentUserId);
	}
}
