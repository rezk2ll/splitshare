import { expect, test } from '@playwright/test';

test.describe('Home Page', () => {
	test('should load the home page successfully', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/SplitShare/i);
	});

	test('should navigate to discover page', async ({ page }) => {
		await page.goto('/');
		const discoverLink = page.getByRole('link', { name: /discover/i });
		await discoverLink.click();
		await expect(page).toHaveURL('/discover');
	});
});
