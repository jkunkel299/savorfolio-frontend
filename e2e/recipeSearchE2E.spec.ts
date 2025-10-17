import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // go to search page
    await page.goto('/search');
});

test('page shows all recipes', async ({ page }) => {
    // assert the search filters are visible
    await expect(page.locator('div').filter({ hasText: 'FiltersSearch for Ingredients' }).nth(3)).toBeVisible();
    // assert the initial recipes are visible - also tests recipeSearch for all recipes
    await expect(page.locator('div').filter({ hasText: 'Chicken RagoutServings: 4Prep Time: 10 minutesCook Time: 20 minutesFall Spice' }).nth(3)).toBeVisible();
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
    await expect(page.locator('#root')).toContainText('Chicken RagoutServings: 4Prep Time: 10 minutesCook Time: 20 minutes');
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
    await expect(page.locator('#root')).toContainText('Fall Spice Chocolate Chip CookiesServings: 8Prep Time: 15 minutesCook Time: 10 minutes');
});

test('recipe search, include, exclude ingredients', async ({ page }) => {
    // set include and exclude autocomplete component locators
    const includeInput = page.locator('#include-ingredients');
    const excludeInput = page.locator('#exclude-ingredients');

    // assert the search filters are visible
    await expect(page.locator('div').filter({ hasText: 'FiltersSearch for Ingredients' }).nth(3)).toBeVisible();
    // assert the initial recipes are visible - also tests recipeSearch for all recipes
    await expect(page.locator('div').filter({ hasText: 'Chicken RagoutServings: 4Prep Time: 10 minutesCook Time: 20 minutesFall Spice' }).nth(3)).toBeVisible();
    // interact with the include ingredient filter
    await includeInput.click();
    // search term 'chi' offers multiple ingredients from the ingredientSearch API
    await includeInput.fill('chi');
    // select 'chicken' as the ingredient to include
    await page.getByRole('option', { name: 'chicken', exact: true }).click();
    // assert that the expected recipe card is Chicken Ragout
    await expect(page.locator('#root')).toContainText('Chicken RagoutServings: 4Prep Time: 10 minutesCook Time: 20 minutes');
    // interact with the exclude ingredient filter
    await excludeInput.click();
    // search term 'white' offers multiple ingredients from the ingredientSearch API
    await excludeInput.fill('white');
    // select 'white wine' as the ingredient to exclude
    await page.getByRole('option', { name: 'white wine' }).click();
    // assert that the page no longer contains any recipe data - i.e., no recipes exist that both include chicken and exclude white wine
    await expect(page.locator('html')).toContainText('SavorfolioSearchAdd RecipeFiltersReset FiltersSearch for Ingredients to IncludechickenSearch for Ingredients to Excludewhite wine');
    // focus on the includeInput autocomplete component
    await includeInput.focus();
    // click the 'clear' button to remove the filter to include chicken
    await page.getByTestId('include-clear').click();await page.getByRole('link', { name: 'Search' }).click();
    await expect(page.locator('#root')).toContainText('Chicken RagoutServings: 4Prep Time: 10 minutesCook Time: 20 minutesFall Spice Chocolate Chip CookiesServings: 8Prep Time: 15 minutesCook Time: 10 minutes');
    await page.getByRole('button', { name: 'Fall Spice Chocolate Chip' }).click();
    await expect(page.locator('#root')).toContainText('Fall Spice Chocolate Chip CookiesServings:8Prep Time:15 minutesCook Time:10 minutesBake Temperature:400 °FIngredients12 Tablespoon butter, salted (cold, cut into cubes)0.5 Cup brown sugar0.5 Cup white sugar1 Whole egg2 Tablespoon molasses2 Cup all-purpose flour1 Teaspoon baking soda1 Teaspoon corn starch0.5 Teaspoon salt1 Teaspoon cinnamon1.25 Teaspoon ginger, ground0.5 Teaspoon nutmeg1/8 Teaspoon cloves1 1/2 Cup semi-sweet chocolate chipsInstructions1. Preheat oven to 400°F2. In a large mixing bowl, beat butter, brown sugar, and sugar for 4 minutes until light and fluffy.3. Add molasses and egg and mix for 1 minute longer.4. Fold in flour, baking soda, corn starch, salt, cinnamon, ginger, nutmeg, cloves, and chocolate chips.5. Roll into 4-ounce, 5-ounce, or 6-ounce balls. Place on a parchment paper-lined baking sheet. I prefer to use light-colored baking sheets.6. Bake for 8-10 minutes. The cookies will be slightly underdone when you remove them from the oven. Let the cookies sit for 10-15 minutes before moving them from the baking sheet to a wire cooling rack.Recipe TagsRecipe Type: DessertMeal Type: DessertDietary Considerations: Nut-Free');
    await page.getByRole('checkbox', { name: '12 Tablespoon butter, salted' }).check();
    await page.getByRole('checkbox', { name: 'Cup brown sugar' }).check();
    await page.getByRole('checkbox', { name: '12 Tablespoon butter, salted' }).uncheck();
    await page.getByRole('checkbox', { name: 'Cup brown sugar' }).uncheck();
    // assert that the expected recipe card is Fall Spice Chocolate Chip Cookies
    await expect(page.locator('#root')).toContainText('Fall Spice Chocolate Chip CookiesServings: 8Prep Time: 15 minutesCook Time: 10 minutes');
    // focus on the excludeInput autocomplete component
    await excludeInput.focus();
    // click the 'clear' button to remove the filter to exclude white wine
    await page.getByTestId('exclude-clear').click();
    // assert all recipes are visible
    await expect(page.locator('#root')).toContainText('Chicken RagoutServings: 4Prep Time: 10 minutesCook Time: 20 minutesFall Spice Chocolate Chip CookiesServings: 8Prep Time: 15 minutesCook Time: 10 minutes');
});