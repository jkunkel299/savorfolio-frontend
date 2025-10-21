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
    await expect(page.locator('#root')).toContainText('SavorfolioSearchAdd RecipeBack to SearchFall Spice Chocolate Chip CookiesSoft, chewy Fall cookie with dark brown sugar, molasses, cinnamon, ginger, cloves, nutmeg, and chocolate chips for the perfect Autumn cookie. This is the perfect Fall spiced chocolate chip cookie recipe!Servings:8Prep Time:15 minutesCook Time:10 minutesBake Temperature:400 °FIngredients12 tablespoons butter, salted (cold, cut into cubes)0.5 cup brown sugar0.5 cup white sugar1 whole egg2 tablespoons molasses2 cups all-purpose flour1 teaspoon baking soda1 teaspoon corn starch0.5 teaspoon salt1 teaspoon cinnamon1.25 teaspoons ginger, ground0.5 teaspoon nutmeg1/8 teaspoon cloves1 1/2 cups semi-sweet chocolate chipsInstructions1. Preheat oven to 400°F2. In a large mixing bowl, beat butter, brown sugar, and sugar for 4 minutes until light and fluffy.3. Add molasses and egg and mix for 1 minute longer.4. Fold in flour, baking soda, corn starch, salt, cinnamon, ginger, nutmeg, cloves, and chocolate chips.5. Roll into 4-ounce, 5-ounce, or 6-ounce balls. Place on a parchment paper-lined baking sheet. I prefer to use light-colored baking sheets.6. Bake for 8-10 minutes. The cookies will be slightly underdone when you remove them from the oven. Let the cookies sit for 10-15 minutes before moving them from the baking sheet to a wire cooling rack.Recipe TagsRecipe Type: DessertMeal Type: DessertDietary Considerations: Nut-Free');
    // check the box for the ingredient '12 Tablespoon butter, salted'
    await page.getByRole('checkbox', { name: '12 tablespoons butter, salted' }).check();
    // assert the checked element
    await expect(page.locator('label').filter({ hasText: '12 tablespoons butter, salted' })).toBeVisible();
    // uncheck the box
    await page.getByRole('checkbox', { name: '12 tablespoons butter, salted' }).uncheck();
    // use the back to search button to return to the search page
    await page.getByRole('button', { name: 'Back to Search' }).click();
    // assert the page contains the recipe cards
    await expect(page.locator('#root')).toContainText('Chicken RagoutServings: 4Prep Time: 10 minutesCook Time: 20 minutesFall Spice Chocolate Chip CookiesServings: 8Prep Time: 15 minutesCook Time: 10 minutes');
});