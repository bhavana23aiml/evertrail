import { test, expect } from '@playwright/test';

test('homepage planner explains remaining setup and links to trek discovery', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Plan with AI', exact: true }).click();
  await expect(page).toHaveURL(/\/ai-planner$/);
  await expect(page.getByRole('heading', { name: 'AI planner setup in progress' })).toBeVisible();
  await expect(page.getByRole('status')).toContainText('The Supabase client is configured.');
  await expect(page.getByRole('status')).toContainText('No itinerary has been generated or saved.');
  await page.getByRole('link', { name: 'Browse sample treks' }).click();
  await expect(page).toHaveURL(/\/treks$/);
  await expect(page.getByRole('heading', { name: 'Explore the extraordinary.' })).toBeVisible();
});
