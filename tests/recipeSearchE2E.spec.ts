import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // go to search page
  await page.goto('/search');
});

test('page shows all recipes', async ({ page }) => {
  // assert the search filters are visible
  await expect(page.locator('div').filter({ hasText: 'FiltersSearch for Ingredients' }).nth(3)).toBeVisible();
  // assert the initial recipes are visible - also tests recipeSearch for all recipes
  await expect(page.locator('div').filter({ hasText: 'Chicken RagoutServings: 4Cook Time: 20 minutesPrep Time: 10 minutesFall Spice' }).nth(3)).toBeVisible();
});

test('include recipes filter', async ({ page }) => {
  /// set include autocomplete component locator
  const includeInput = page.locator('#include-ingredients');
  
  // interact with the include ingredient filter
  await includeInput.click();
  // search term 'chi' offers multiple ingredients from the ingredientSearch API
  await includeInput.fill('chi');
  // select 'chicken' as the ingredient to include
  await page.getByRole('option', { name: 'chicken', exact: true }).click();
  // assert that the expected recipe card is Chicken Ragout
  await expect(page.locator('#root')).toContainText('Chicken RagoutServings: 4Cook Time: 20 minutesPrep Time: 10 minutes');
});

test('exclude recipes filter', async ({ page }) => {
  /// set exclude autocomplete component locator
  const excludeInput = page.locator('#exclude-ingredients');
  
  // interact with the exclude ingredient filter
  await excludeInput.click();
  // search term 'white' offers multiple ingredients from the ingredientSearch API
  await excludeInput.fill('white');
  // select 'white wine' as the ingredient to exclude
  await page.getByRole('option', { name: 'white wine' }).click();
  // assert that the expected recipe card is Fall Spice Chocolate Chip Cookies
  await expect(page.locator('#root')).toContainText('Fall Spice Chocolate Chip CookiesServings: 8Cook Time: 10 minutesPrep Time: 15 minutes');
});

test('recipe search, include, exclude ingredients', async ({ page }) => {
  // set include and exclude autocomplete component locators
  const includeInput = page.locator('#include-ingredients');
  const excludeInput = page.locator('#exclude-ingredients');

  // assert the search filters are visible
  await expect(page.locator('div').filter({ hasText: 'FiltersSearch for Ingredients' }).nth(3)).toBeVisible();
  // assert the initial recipes are visible - also tests recipeSearch for all recipes
  await expect(page.locator('div').filter({ hasText: 'Chicken RagoutServings: 4Cook Time: 20 minutesPrep Time: 10 minutesFall Spice' }).nth(3)).toBeVisible();
  // interact with the include ingredient filter
  await includeInput.click();
  // search term 'chi' offers multiple ingredients from the ingredientSearch API
  await includeInput.fill('chi');
  // select 'chicken' as the ingredient to include
  await page.getByRole('option', { name: 'chicken', exact: true }).click();
  // assert that the expected recipe card is Chicken Ragout
  await expect(page.locator('#root')).toContainText('Chicken RagoutServings: 4Cook Time: 20 minutesPrep Time: 10 minutes');
  // interact with the exclude ingredient filter
  await excludeInput.click();
  // search term 'white' offers multiple ingredients from the ingredientSearch API
  await excludeInput.fill('white');
  // select 'white wine' as the ingredient to exclude
  await page.getByRole('option', { name: 'white wine' }).click();
  // assert that the page no longer contains any recipe data - i.e., no recipes exist that both include chicken and exclude white wine
  await expect(page.locator('html')).toMatchAriaSnapshot(`
    - document:
      - banner:
        - text: Savorfolio
        - button "Search"
        - button "Add Recipe"
      - heading "Filters" [level=6]
      - paragraph: Search for Ingredients to Include
      - button "chicken"
      - combobox "Ingredients"
      - button "Open"
      - paragraph: Search for Ingredients to Exclude
      - button "white wine"
      - combobox "Ingredients"
      - button "Open"
    `);
  // focus on the includeInput autocomplete component
  await includeInput.focus();
  // click the 'clear' button to remove the filter to include chicken
  await page.getByTestId('include-clear').click();
  // assert that the expected recipe card is Fall Spice Chocolate Chip Cookies
  await expect(page.locator('#root')).toContainText('Fall Spice Chocolate Chip CookiesServings: 8Cook Time: 10 minutesPrep Time: 15 minutes');
  // focus on the excludeInput autocomplete component
  await excludeInput.focus();
  // click the 'clear' button to remove the filter to exclude white wine
  await page.getByTestId('exclude-clear').click();
  // assert all recipes are visible
  await expect(page.locator('#root')).toContainText('Chicken RagoutServings: 4Cook Time: 20 minutesPrep Time: 10 minutesFall Spice Chocolate Chip CookiesServings: 8Cook Time: 10 minutesPrep Time: 15 minutes');
});