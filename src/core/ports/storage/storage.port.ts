/**
 * Port (interface) for Storage service
 * Any storage provider must implement this interface
 */

export interface UploadResult {
	url: string;
	key: string;
}

export interface IStorageService {
	/**
	 * Uploads a file
	 */
	upload(file: File | Blob, path: string): Promise<UploadResult>;

	/**
	 * Deletes a file
	 */
	delete(key: string): Promise<void>;

	/**
	 * Gets signed URL for private file
	 */
	getSignedUrl(key: string, expiresInSeconds?: number): Promise<string>;

	/**
	 * Checks if file exists
	 */
	exists(key: string): Promise<boolean>;
}
