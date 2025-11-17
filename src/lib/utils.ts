import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Component } from 'svelte';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Helper type for Svelte 5 component props with element ref
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithElementRef<T extends Record<string, any>> = T & {
	ref?: HTMLElement | null;
};

// Re-export for compatibility
export { type Component };
