import { browser } from '$app/environment';

// API base URL configuration
// For web: Uses relative URLs (same origin)
// For mobile: Points to deployed backend API
export const API_BASE_URL = browser
	? (import.meta.env.VITE_API_BASE_URL as string | undefined) || window.location.origin
	: (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://localhost:5173';

// Check if running in mobile app context
export const IS_MOBILE_APP = browser && (window as any).Capacitor !== undefined;
