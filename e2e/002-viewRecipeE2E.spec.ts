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


    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - 'button /Chicken Ragout Servings: 4 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
        - paragraph:
          - paragraph: "Servings: 4"
          - paragraph: "/Prep Time: \\\\d+ minutes/"
          - paragraph: "/Cook Time: \\\\d+ minutes/"
      - 'button /Fall Spice Chocolate Chip Cookies Servings: 8 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
        - paragraph:
          - paragraph: "Servings: 8"
          - paragraph: "/Prep Time: \\\\d+ minutes/"
          - paragraph: "/Cook Time: \\\\d+ minutes/"
      - 'button /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
        - paragraph:
          - paragraph: "/Servings: \\\\d+/"
          - paragraph: "/Prep Time: \\\\d+ minutes/"
          - paragraph: "/Cook Time: \\\\d+ minutes/"
      `);
    // click on the recipe card for fall spice chocolate chip cookies
    await page.getByRole('button', { name: 'Fall Spice Chocolate Chip' }).click();
    // assert the page contains the recipe data
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Fall Spice Chocolate Chip Cookies" [level=3]
      - heading "Soft, chewy Fall cookie with dark brown sugar, molasses, cinnamon, ginger, cloves, nutmeg, and chocolate chips for the perfect Autumn cookie. This is the perfect Fall spiced chocolate chip cookie recipe!" [level=6]
      - paragraph: "Servings:"
      - paragraph: "8"
      - paragraph: "Prep Time:"
      - paragraph: /\\d+ minutes/
      - paragraph: "Cook Time:"
      - paragraph: /\\d+ minutes/
      - paragraph: "Bake Temperature:"
      - paragraph: /\\d+ °F/
      - heading "Ingredients" [level=4]
      - checkbox /\\d+ tablespoons butter, salted \\(cold, cut into cubes\\)/
      - text: /\\d+ tablespoons butter, salted \\(cold, cut into cubes\\)/
      - checkbox "0.5 cup brown sugar"
      - text: 0.5 cup brown sugar
      - checkbox "0.5 cup white sugar"
      - text: 0.5 cup white sugar
      - checkbox "1 whole egg"
      - text: 1 whole egg
      - checkbox "2 tablespoons molasses"
      - text: 2 tablespoons molasses
      - checkbox "2 cups all-purpose flour"
      - text: 2 cups all-purpose flour
      - checkbox "1 teaspoon baking soda"
      - text: 1 teaspoon baking soda
      - checkbox "1 teaspoon corn starch"
      - text: 1 teaspoon corn starch
      - checkbox "0.5 teaspoon salt"
      - text: 0.5 teaspoon salt
      - checkbox "1 teaspoon cinnamon"
      - text: 1 teaspoon cinnamon
      - checkbox /\\d+\\.\\d+ teaspoons ginger, ground/
      - text: /\\d+\\.\\d+ teaspoons ginger, ground/
      - checkbox "0.5 teaspoon nutmeg"
      - text: 0.5 teaspoon nutmeg
      - checkbox "1/8 teaspoon cloves"
      - text: 1/8 teaspoon cloves
      - checkbox "1 1/2 cups semi-sweet chocolate chips"
      - text: 1 1/2 cups semi-sweet chocolate chips
      - heading "Instructions" [level=4]
      - paragraph: "1."
      - paragraph: /Preheat oven to \\d+°F/
      - paragraph: "2."
      - paragraph: In a large mixing bowl, beat butter, brown sugar, and sugar for 4 minutes until light and fluffy.
      - paragraph: "3."
      - paragraph: Add molasses and egg and mix for 1 minute longer.
      - paragraph: "4."
      - paragraph: Fold in flour, baking soda, corn starch, salt, cinnamon, ginger, nutmeg, cloves, and chocolate chips.
      - paragraph: "5."
      - paragraph: Roll into 4-ounce, 5-ounce, or 6-ounce balls. Place on a parchment paper-lined baking sheet. I prefer to use light-colored baking sheets.
      - paragraph: "6."
      - paragraph: /Bake for 8-\\d+ minutes\\. The cookies will be slightly underdone when you remove them from the oven\\. Let the cookies sit for \\d+-\\d+ minutes before moving them from the baking sheet to a wire cooling rack\\./
      - separator
      - heading "Recipe Tags" [level=4]
      - heading "Recipe Type:" [level=5]
      - paragraph: Dessert
      - heading "Meal Type:" [level=5]
      - paragraph: Dessert
      - heading "Dietary Considerations:" [level=5]
      - paragraph: Nut-Free
      `);
    // check the box for the ingredient '12 Tablespoon butter, salted'
    await page.getByRole('checkbox', { name: '12 tablespoons butter, salted' }).check();
    // assert the checked element
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - checkbox /\\d+ tablespoons butter, salted \\(cold, cut into cubes\\)/ [checked]
      - text: /\\d+ tablespoons butter, salted \\(cold, cut into cubes\\)/
      `);
    // uncheck the box
    await page.getByRole('checkbox', { name: '12 tablespoons butter, salted' }).uncheck();
    // use the back to search button to return to the search page
    await page.getByRole('button', { name: 'Back to Search' }).click();
    // assert the page contains the recipe cards
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - 'button /Chicken Ragout Servings: 4 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
        - paragraph:
          - paragraph: "Servings: 4"
          - paragraph: "/Prep Time: \\\\d+ minutes/"
          - paragraph: "/Cook Time: \\\\d+ minutes/"
      - 'button /Fall Spice Chocolate Chip Cookies Servings: 8 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
        - paragraph:
          - paragraph: "Servings: 8"
          - paragraph: "/Prep Time: \\\\d+ minutes/"
          - paragraph: "/Cook Time: \\\\d+ minutes/"
      - 'button /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
        - paragraph:
          - paragraph: "/Servings: \\\\d+/"
          - paragraph: "/Prep Time: \\\\d+ minutes/"
          - paragraph: "/Cook Time: \\\\d+ minutes/"
      `);
});