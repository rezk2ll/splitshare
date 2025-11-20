import { describe, it, expect } from 'vitest';
import { DIFFICULTY_LEVELS, ITEMS_PER_PAGE, WORKOUT_TAGS } from '$lib/constants';

describe('constants', () => {
	describe('DIFFICULTY_LEVELS', () => {
		it('should contain three difficulty levels', () => {
			expect(DIFFICULTY_LEVELS).toHaveLength(3);
		});

		it('should include beginner, intermediate, and advanced', () => {
			expect(DIFFICULTY_LEVELS).toContain('beginner');
			expect(DIFFICULTY_LEVELS).toContain('intermediate');
			expect(DIFFICULTY_LEVELS).toContain('advanced');
		});
	});

	describe('ITEMS_PER_PAGE', () => {
		it('should be set to 12', () => {
			expect(ITEMS_PER_PAGE).toBe(12);
		});

		it('should be a positive number', () => {
			expect(ITEMS_PER_PAGE).toBeGreaterThan(0);
		});
	});

	describe('WORKOUT_TAGS', () => {
		it('should contain multiple workout tags', () => {
			expect(WORKOUT_TAGS.length).toBeGreaterThan(0);
		});

		it('should include common workout types', () => {
			expect(WORKOUT_TAGS).toContain('Strength');
			expect(WORKOUT_TAGS).toContain('Hypertrophy');
			expect(WORKOUT_TAGS).toContain('Cardio');
		});
	});
});
