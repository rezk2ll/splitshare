import type { IExerciseRepository } from '../../ports/repositories/exercise.repository.port';
import type { UpdateExerciseDto } from '../../domain/exercise/exercise.dto';
import type { Exercise } from '../../domain/exercise/exercise.entity';
import { Exercise as ExerciseEntity } from '../../domain/exercise/exercise.entity';

/**
 * Use case: Update an existing exercise
 */
export class UpdateExerciseUseCase {
	constructor(private exerciseRepository: IExerciseRepository) {}

	async execute(id: string, userId: string, input: UpdateExerciseDto): Promise<Exercise> {
		const exists = await this.exerciseRepository.exists(id);
		if (!exists) {
			throw new Error('Exercise not found');
		}

		const isOwner = await this.exerciseRepository.isOwnedByUser(id, userId);
		if (!isOwner) {
			throw new Error('Not authorized to update this exercise');
		}

		// Validate input if provided
		if (input.name !== undefined) {
			ExerciseEntity.validateName(input.name);
		}

		if (input.muscleGroup !== undefined) {
			ExerciseEntity.validateMuscleGroup(input.muscleGroup);
		}

		if (input.equipmentType !== undefined) {
			ExerciseEntity.validateEquipmentType(input.equipmentType);
		}

		if (input.difficulty) {
			ExerciseEntity.validateDifficulty(input.difficulty);
		}

		return this.exerciseRepository.update(id, input);
	}
}
