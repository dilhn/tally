import { test, expect } from '@playwright/test';

test('home page loads with correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Tally');
});

test('home page displays coming soon message', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Tally' })).toBeVisible();
  await expect(page.getByText('coming soon')).toBeVisible();
});
