import type { ISplitRepository } from '../../ports/repositories/split.repository.port';
import type { SplitFiltersDto, SplitWithDetailsDto } from '../../domain/split/split.dto';
import type { Pagination } from '../../domain/common/value-objects';

/**
 * Use case: Search splits with filters
 */
export class SearchSplitsUseCase {
	constructor(private splitRepository: ISplitRepository) {}

	async execute(
		filters: SplitFiltersDto,
		pagination: Pagination,
		currentUserId?: string
	): Promise<SplitWithDetailsDto[]> {
		return this.splitRepository.findWithFilters(filters, pagination, currentUserId);
	}
}
