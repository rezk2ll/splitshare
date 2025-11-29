import type { IExerciseRepository } from '../../ports/repositories/exercise.repository.port';
import type { CreateExerciseDto } from '../../domain/exercise/exercise.dto';
import type { Exercise } from '../../domain/exercise/exercise.entity';
import { Exercise as ExerciseEntity } from '../../domain/exercise/exercise.entity';

/**
 * Use case: Create a new exercise
 */
export class CreateExerciseUseCase {
	constructor(private exerciseRepository: IExerciseRepository) {}

	async execute(input: CreateExerciseDto): Promise<Exercise> {
		ExerciseEntity.validateName(input.name);
		ExerciseEntity.validateMuscleGroup(input.muscleGroup);
		ExerciseEntity.validateEquipmentType(input.equipmentType);
		ExerciseEntity.validateDifficulty(input.difficulty);

		return this.exerciseRepository.create(input);
	}
}
