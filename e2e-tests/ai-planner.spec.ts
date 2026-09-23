import { test, expect } from '@playwright/test';

test('homepage AI planner link opens its availability page and returns to discovery', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Plan with AI', exact: true }).click();
  await expect(page).toHaveURL(/\/ai-planner$/);
  await expect(page.getByRole('heading', { name: 'Planner not connected yet' })).toBeVisible();
  await expect(page.getByRole('status')).toContainText('No itinerary has been generated or saved.');
  await page.getByRole('link', { name: 'Browse sample treks' }).click();
  await expect(page).toHaveURL(/\/#discover$/);
  await expect(page.getByRole('heading', { name: 'Some trails stay with you.' })).toBeVisible();
});
