import type { IExerciseRepository } from '../../ports/repositories/exercise.repository.port';
import type { ExerciseFiltersDto } from '../../domain/exercise/exercise.dto';
import type { Exercise } from '../../domain/exercise/exercise.entity';

/**
 * Use case: Search exercises with filters
 */
export class SearchExercisesUseCase {
	constructor(private exerciseRepository: IExerciseRepository) {}

	async execute(filters: ExerciseFiltersDto): Promise<Exercise[]> {
		return this.exerciseRepository.findWithFilters(filters);
	}
}
