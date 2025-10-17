import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // go to search page
    await page.goto('/search');
});

test('can view a recipe', async ({ page }) => {
    // go to home page
    await page.getByRole('link').filter({ hasText: /^$/ }).click();
    // navigate to search page
    await page.getByRole('link', { name: 'Search' }).click();
    // assert the page contains the recipe cards
    await expect(page.locator('#root')).toContainText('Chicken RagoutServings: 4Prep Time: 10 minutesCook Time: 20 minutesFall Spice Chocolate Chip CookiesServings: 8Prep Time: 15 minutesCook Time: 10 minutes');
    // click on the recipe card for fall spice chocolate chip cookies
    await page.getByRole('button', { name: 'Fall Spice Chocolate Chip' }).click();
    // assert the page contains the recipe data
    await expect(page.locator('#root')).toContainText('Back to SearchFall Spice Chocolate Chip CookiesServings:8Prep Time:15 minutesCook Time:10 minutesBake Temperature:400 °FIngredients12 Tablespoon butter, salted (cold, cut into cubes)0.5 Cup brown sugar0.5 Cup white sugar1 Whole egg2 Tablespoon molasses2 Cup all-purpose flour1 Teaspoon baking soda1 Teaspoon corn starch0.5 Teaspoon salt1 Teaspoon cinnamon1.25 Teaspoon ginger, ground0.5 Teaspoon nutmeg1/8 Teaspoon cloves1 1/2 Cup semi-sweet chocolate chipsInstructions1. Preheat oven to 400°F2. In a large mixing bowl, beat butter, brown sugar, and sugar for 4 minutes until light and fluffy.3. Add molasses and egg and mix for 1 minute longer.4. Fold in flour, baking soda, corn starch, salt, cinnamon, ginger, nutmeg, cloves, and chocolate chips.5. Roll into 4-ounce, 5-ounce, or 6-ounce balls. Place on a parchment paper-lined baking sheet. I prefer to use light-colored baking sheets.6. Bake for 8-10 minutes. The cookies will be slightly underdone when you remove them from the oven. Let the cookies sit for 10-15 minutes before moving them from the baking sheet to a wire cooling rack.Recipe TagsRecipe Type: DessertMeal Type: DessertDietary Considerations: Nut-Free');
    // check the box for the ingredient '12 Tablespoon butter, salted'
    await page.getByRole('checkbox', { name: '12 Tablespoon butter, salted' }).check();
    // assert the checked element
    await expect(page.locator('label').filter({ hasText: '12 Tablespoon butter, salted' })).toBeVisible();
    // uncheck the box
    await page.getByRole('checkbox', { name: '12 Tablespoon butter, salted' }).uncheck();
    // use the back to search button to return to the search page
    await page.getByRole('button', { name: 'Back to Search' }).click();
    // assert the page contains the recipe cards
    await expect(page.locator('#root')).toContainText('Chicken RagoutServings: 4Prep Time: 10 minutesCook Time: 20 minutesFall Spice Chocolate Chip CookiesServings: 8Prep Time: 15 minutesCook Time: 10 minutes');
});