import { db } from '$lib/server/db';
import { auth } from '$lib/server/auth';

// Adapters
import { DrizzleSplitRepositoryAdapter } from '../../adapters/repositories/drizzle/split.repository.adapter';
import { DrizzleExerciseRepositoryAdapter } from '../../adapters/repositories/drizzle/exercise.repository.adapter';
import { DrizzleUserRepositoryAdapter } from '../../adapters/repositories/drizzle/user.repository.adapter';
import { BetterAuthAdapter } from '../../adapters/auth/better-auth/auth.adapter';

// Use cases
import { CreateSplitUseCase } from '../../core/usecases/split/create-split.usecase';
import { UpdateSplitUseCase } from '../../core/usecases/split/update-split.usecase';
import { DeleteSplitUseCase } from '../../core/usecases/split/delete-split.usecase';
import { GetSplitUseCase } from '../../core/usecases/split/get-split.usecase';
import { SearchSplitsUseCase } from '../../core/usecases/split/search-splits.usecase';

import { CreateExerciseUseCase } from '../../core/usecases/exercise/create-exercise.usecase';
import { UpdateExerciseUseCase } from '../../core/usecases/exercise/update-exercise.usecase';
import { SearchExercisesUseCase } from '../../core/usecases/exercise/search-exercises.usecase';

/**
 * Dependency Injection Container
 *
 * This is where we wire up all dependencies.
 * To swap implementations, just change the adapters here.
 */
class Container {
	// Repositories (adapters)
	private _splitRepository?: DrizzleSplitRepositoryAdapter;
	private _exerciseRepository?: DrizzleExerciseRepositoryAdapter;
	private _userRepository?: DrizzleUserRepositoryAdapter;

	// Services (adapters)
	private _authService?: BetterAuthAdapter;

	// Lazy initialization for repositories
	get splitRepository(): DrizzleSplitRepositoryAdapter {
		if (!this._splitRepository) {
			this._splitRepository = new DrizzleSplitRepositoryAdapter(db);
		}
		return this._splitRepository;
	}

	get exerciseRepository(): DrizzleExerciseRepositoryAdapter {
		if (!this._exerciseRepository) {
			this._exerciseRepository = new DrizzleExerciseRepositoryAdapter(db);
		}
		return this._exerciseRepository;
	}

	get userRepository(): DrizzleUserRepositoryAdapter {
		if (!this._userRepository) {
			this._userRepository = new DrizzleUserRepositoryAdapter(db);
		}
		return this._userRepository;
	}

	get authService(): BetterAuthAdapter {
		if (!this._authService) {
			this._authService = new BetterAuthAdapter(auth);
		}
		return this._authService;
	}

	// Use cases
	get createSplit(): CreateSplitUseCase {
		return new CreateSplitUseCase(this.splitRepository);
	}

	get updateSplit(): UpdateSplitUseCase {
		return new UpdateSplitUseCase(this.splitRepository);
	}

	get deleteSplit(): DeleteSplitUseCase {
		return new DeleteSplitUseCase(this.splitRepository);
	}

	get getSplit(): GetSplitUseCase {
		return new GetSplitUseCase(this.splitRepository);
	}

	get searchSplits(): SearchSplitsUseCase {
		return new SearchSplitsUseCase(this.splitRepository);
	}

	get createExercise(): CreateExerciseUseCase {
		return new CreateExerciseUseCase(this.exerciseRepository);
	}

	get updateExercise(): UpdateExerciseUseCase {
		return new UpdateExerciseUseCase(this.exerciseRepository);
	}

	get searchExercises(): SearchExercisesUseCase {
		return new SearchExercisesUseCase(this.exerciseRepository);
	}
}

/**
 * Global container instance
 */
export const container = new Container();
