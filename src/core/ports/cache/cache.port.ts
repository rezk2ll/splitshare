/**
 * Port (interface) for Cache service
 * Any cache provider must implement this interface
 */

export interface ICacheService {
	/**
	 * Gets value from cache
	 */
	get<T>(key: string): Promise<T | null>;

	/**
	 * Sets value in cache
	 */
	set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;

	/**
	 * Deletes value from cache
	 */
	delete(key: string): Promise<void>;

	/**
	 * Checks if key exists
	 */
	exists(key: string): Promise<boolean>;

	/**
	 * Clears all cache
	 */
	clear(): Promise<void>;
}
