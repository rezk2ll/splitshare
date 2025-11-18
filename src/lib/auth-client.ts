import { createAuthClient } from 'better-auth/svelte';
import { API_BASE_URL } from './config';

export const authClient = createAuthClient({
	baseURL: API_BASE_URL
});

export const { signIn, signUp, signOut, useSession } = authClient;
