import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // go to search page
    await page.goto('/search');
});

test('page shows all recipes', async ({ page }) => {
    // assert the search filters are visible
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
        - heading "Filters" [level=6]
        - button "Reset Filters"
        - paragraph: Search for Ingredients to Include
        - combobox "Ingredients"
        - button "Open"
        - paragraph: Search for Ingredients to Exclude
        - combobox "Ingredients"
        - button "Open"
    `);
    // assert the initial recipes are visible - also tests recipeSearch for all recipes
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

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - 'button /Chicken Ragout Servings: 4 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
        - paragraph:
          - paragraph: "Servings: 4"
          - paragraph: "/Prep Time: \\\\d+ minutes/"
          - paragraph: "/Cook Time: \\\\d+ minutes/"
      `);
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
    // assert that the expected recipe cards are Fall Spice Chocolate Chip Cookies and Maple Glazed Apple Blondies
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
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

test('recipe search, include, exclude ingredients', async ({ page }) => {
    // set include and exclude autocomplete component locators
    const includeInput = page.locator('#include-ingredients');
    const excludeInput = page.locator('#exclude-ingredients');

    // assert the search filters are visible
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Filters" [level=6]
      - button "Reset Filters"
      - paragraph: Search for Ingredients to Include
      - combobox "Ingredients"
      - button "Open"
      - paragraph: Search for Ingredients to Exclude
      - combobox "Ingredients"
      - button "Open"
      `);
    // assert the initial recipes are visible - also tests recipeSearch for all recipes
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
    // interact with the include ingredient filter
    await includeInput.click();
    // search term 'chi' offers multiple ingredients from the ingredientSearch API
    await includeInput.fill('chi');
    // select 'chicken' as the ingredient to include
    await page.getByRole('option', { name: 'chicken', exact: true }).click();
    // assert that the expected recipe card is Chicken Ragout
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - 'button /Chicken Ragout Servings: 4 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
        - paragraph:
          - paragraph: "Servings: 4"
          - paragraph: "/Prep Time: \\\\d+ minutes/"
          - paragraph: "/Cook Time: \\\\d+ minutes/"
      `);
    // interact with the exclude ingredient filter
    await excludeInput.click();
    // search term 'white' offers multiple ingredients from the ingredientSearch API
    await excludeInput.fill('white');
    // select 'white wine' as the ingredient to exclude
    await page.getByRole('option', { name: 'white wine' }).click();
    // assert that the text “No recipes found. Try other filters!” is visible - i.e., no recipes exist that both include chicken and exclude white wine
    await expect(page.locator('#root')).toMatchAriaSnapshot(`- paragraph: No recipes found. Try other filters!`);
    // focus on the includeInput autocomplete component
    await includeInput.focus();
    // click the 'clear' button to remove the filter to include chicken
    await page.getByTestId('include-clear').click();await page.getByRole('link', { name: 'Search' }).click();
    // assert that the expected recipe cards are Fall Spice Chocolate Chip Cookies and Maple Glazed Apple Blondies
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
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
    // focus on the excludeInput autocomplete component
    await excludeInput.focus();
    // click the 'clear' button to remove the filter to exclude white wine
    await page.getByTestId('exclude-clear').click();
    // assert all recipes are visible
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