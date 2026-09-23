import { test, expect } from '@playwright/test';

test('explore, filter and open a sample trek without a 404', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore treks', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Explore the extraordinary.' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Destination', exact: true }).selectOption('Karnataka');
  await page.getByRole('combobox', { name: 'Difficulty', exact: true }).selectOption('Easy');
  await page.getByRole('combobox', { name: 'Month', exact: true }).selectOption('January');
  await page.getByRole('combobox', { name: 'Sort by', exact: true }).selectOption('price-asc');
  await page.getByRole('button', { name: 'Search treks', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('2 treks found');
  await expect(page.locator('article').first()).toContainText('Nandi Hills');
  await page.getByRole('link', { name: /Nandi Hills.*View trek/ }).click();
  await expect(page).toHaveURL(/\/treks\/nandi-hills$/);
  await expect(page.getByRole('heading', { name: 'Nandi Hills', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Departures not available' })).toBeVisible();
  await page.getByRole('link', { name: 'All treks', exact: true }).click();
  await page.getByLabel('Search treks', { exact: true }).fill('unmatched trail');
  await page.getByRole('button', { name: 'Search treks', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'No trails match just yet.' })).toBeVisible();
  await page.getByRole('link', { name: 'Clear filters' }).click();
  await expect(page.getByRole('status')).toHaveText('15 treks found');
});
