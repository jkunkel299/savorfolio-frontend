import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // go to search page
  await page.goto("/search");
});

test("page shows all recipes", async ({ page }) => {
  // assert the search filters are visible

  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - heading "Filters" [level=4]
    - button "Reset Filters"
    - paragraph: Search by Recipe Name
    - textbox "Recipe Title"
    - paragraph: Search for Ingredients to Include
    - combobox "Ingredients"
    - button "Open"
    - paragraph: Search for Ingredients to Exclude
    - combobox "Ingredients"
    - button "Open"
    - paragraph: Select Categories to Include
    - text: Recipe Type
    - radiogroup:
      - radio "Any" [checked]
      - text: Any
      - radio "Main"
      - text: Main
      - radio "Side"
      - text: Side
      - radio "Dessert"
      - text: Dessert
    - button "Show more"
    - text: Meal
    - radiogroup:
      - radio "Any" [checked]
      - text: Any
      - radio "Breakfast"
      - text: Breakfast
      - radio "Lunch"
      - text: Lunch
      - radio "Dinner"
      - text: Dinner
    - button "Show more"
    - text: Cuisine
    - radiogroup:
      - radio "Any" [checked]
      - text: Any
      - radio "Italian"
      - text: Italian
      - radio "Mexican"
      - text: Mexican
      - radio "Chinese"
      - text: Chinese
    - button "Show more"
    - text: Dietary Considerations
    - radiogroup:
      - radio "Any" [checked]
      - text: Any
      - radio "Vegan"
      - text: Vegan
      - radio "Vegetarian"
      - text: Vegetarian
      - radio "Gluten-Free"
      - text: Gluten-Free
    - button "Show more"
    `);

  // assert the initial recipes are visible - also tests recipeSearch for all recipes.
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - paragraph: "Found 3 recipes:"
    - 'link /Chicken Ragout Servings: 4 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/1/chicken-ragout
      - paragraph: "Servings: 4"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    - 'link /Fall Spice Chocolate Chip Cookies Servings: 8 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/2/fall-spice-chocolate-chip-cookies
      - paragraph: "Servings: 8"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    - 'link /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/3/maple-glazed-apple-blondies
      - paragraph: "/Servings: \\\\d+/"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
});

test("include recipes filter", async ({ page }) => {
  /// set include autocomplete component locator
  const includeInput = page.locator("#include-ingredients");

  // interact with the include ingredient filter
  await includeInput.click();
  // search term 'chi' offers multiple ingredients from the ingredientSearch API
  await includeInput.fill("chi");
  // select 'chicken' as the ingredient to include
  await page.getByRole("option", { name: "chicken", exact: true }).click();
  // assert that the expected recipe card is Chicken Ragout

  
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - paragraph: "Found 1 recipe:"
    - 'link /Chicken Ragout Servings: 4 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/1/chicken-ragout
      - paragraph: "Servings: 4"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
});

test("exclude recipes filter", async ({ page }) => {
  /// set exclude autocomplete component locator
  const excludeInput = page.locator("#exclude-ingredients");

  // interact with the exclude ingredient filter
  await excludeInput.click();
  // search term 'white' offers multiple ingredients from the ingredientSearch API
  await excludeInput.fill("white");
  // select 'white wine' as the ingredient to exclude
  await page.getByRole("option", { name: "white wine" }).click();
  // assert that the expected recipe cards are Fall Spice Chocolate Chip Cookies and Maple Glazed Apple Blondies
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - paragraph: "Found 2 recipes:"
    - 'link /Fall Spice Chocolate Chip Cookies Servings: 8 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/2/fall-spice-chocolate-chip-cookies
      - paragraph: "Servings: 8"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    - 'link /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/3/maple-glazed-apple-blondies
      - paragraph: "/Servings: \\\\d+/"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
});

test("recipe search, include, exclude ingredients", async ({ page }) => {
  // set include and exclude autocomplete component locators
  const includeInput = page.locator("#include-ingredients");
  const excludeInput = page.locator("#exclude-ingredients");

  // assert the search filters are visible

  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - heading "Filters" [level=4]
    - button "Reset Filters"
    - paragraph: Search by Recipe Name
    - textbox "Recipe Title"
    - paragraph: Search for Ingredients to Include
    - combobox "Ingredients"
    - button "Open"
    - paragraph: Search for Ingredients to Exclude
    - combobox "Ingredients"
    - button "Open"
    - paragraph: Select Categories to Include
    - text: Recipe Type
    - radiogroup:
      - radio "Any" [checked]
      - text: Any
      - radio "Main"
      - text: Main
      - radio "Side"
      - text: Side
      - radio "Dessert"
      - text: Dessert
    - button "Show more"
    - text: Meal
    - radiogroup:
      - radio "Any" [checked]
      - text: Any
      - radio "Breakfast"
      - text: Breakfast
      - radio "Lunch"
      - text: Lunch
      - radio "Dinner"
      - text: Dinner
    - button "Show more"
    - text: Cuisine
    - radiogroup:
      - radio "Any" [checked]
      - text: Any
      - radio "Italian"
      - text: Italian
      - radio "Mexican"
      - text: Mexican
      - radio "Chinese"
      - text: Chinese
    - button "Show more"
    - text: Dietary Considerations
    - radiogroup:
      - radio "Any" [checked]
      - text: Any
      - radio "Vegan"
      - text: Vegan
      - radio "Vegetarian"
      - text: Vegetarian
      - radio "Gluten-Free"
      - text: Gluten-Free
    - button "Show more"
    `);
  // assert the initial recipes are visible - also tests recipeSearch for all recipes
  
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - paragraph: "Found 3 recipes:"
    - 'link /Chicken Ragout Servings: 4 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/1/chicken-ragout
      - paragraph: "Servings: 4"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    - 'link /Fall Spice Chocolate Chip Cookies Servings: 8 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/2/fall-spice-chocolate-chip-cookies
      - paragraph: "Servings: 8"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    - 'link /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/3/maple-glazed-apple-blondies
      - paragraph: "/Servings: \\\\d+/"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
  // interact with the include ingredient filter
  await includeInput.click();
  // search term 'chi' offers multiple ingredients from the ingredientSearch API
  await includeInput.fill("chi");
  // select 'chicken' as the ingredient to include
  await page.getByRole("option", { name: "chicken", exact: true }).click();
  // assert that the expected recipe card is Chicken Ragout
  
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - paragraph: "Found 1 recipe:"
    - 'link /Chicken Ragout Servings: 4 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/1/chicken-ragout
      - paragraph: "Servings: 4"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
  // interact with the exclude ingredient filter
  await excludeInput.click();
  // search term 'white' offers multiple ingredients from the ingredientSearch API
  await excludeInput.fill("white");
  // select 'white wine' as the ingredient to exclude
  await page.getByRole("option", { name: "white wine" }).click();
  // assert that the text “No recipes found. Try other filters!” is visible - i.e., no recipes exist that both include chicken and exclude white wine
  await expect(page.locator("#root")).toMatchAriaSnapshot(
    `- paragraph: No recipes found. Try other filters!`
  );
  // focus on the includeInput autocomplete component
  await includeInput.focus();
  // click the 'clear' button to remove the filter to include chicken
  await page.getByTestId("include-clear").click();
  await page.getByRole("link", { name: "Search" }).click();
  // assert that the expected recipe cards are Fall Spice Chocolate Chip Cookies and Maple Glazed Apple Blondies
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - paragraph: "Found 2 recipes:"
    - 'link /Fall Spice Chocolate Chip Cookies Servings: 8 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/2/fall-spice-chocolate-chip-cookies
      - paragraph: "Servings: 8"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    - 'link /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/3/maple-glazed-apple-blondies
      - paragraph: "/Servings: \\\\d+/"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
  
  // focus on the excludeInput autocomplete component
  await excludeInput.focus();
  // click the 'clear' button to remove the filter to exclude white wine
  await page.getByTestId("exclude-clear").click();
  // assert all recipes are visible
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - paragraph: "Found 3 recipes:"
    - 'link /Chicken Ragout Servings: 4 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/1/chicken-ragout
      - paragraph: "Servings: 4"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    - 'link /Fall Spice Chocolate Chip Cookies Servings: 8 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/2/fall-spice-chocolate-chip-cookies
      - paragraph: "Servings: 8"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    - 'link /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/3/maple-glazed-apple-blondies
      - paragraph: "/Servings: \\\\d+/"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
});

test("recipe search, category filtering", async ({ page }) => {
  /* Filter by recipe type = Main */
  // select the recipe type filter "Main"
  await page.getByRole("radio", { name: "Main" }).check();
  // assert the filtered recipe list only contains Chicken Ragout
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - paragraph: "Found 1 recipe:"
    - 'link /Chicken Ragout Servings: 4 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/1/chicken-ragout
      - paragraph: "Servings: 4"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
  // click the "Reset Filters" button
  await page.getByRole("button", { name: "Reset Filters" }).click();

  /* Filter by recipe type = Dessert */
  // select the recipe type filter "Dessert"
  await page.getByRole("radio", { name: "Dessert" }).check();
  // assert the filtered recipe list contains Fall Spice Chocolate Chip Cookies and Maple Glazed Apple Blondies
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - paragraph: "Found 2 recipes:"
    - 'link /Fall Spice Chocolate Chip Cookies Servings: 8 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/2/fall-spice-chocolate-chip-cookies
      - paragraph: "Servings: 8"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    - 'link /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/3/maple-glazed-apple-blondies
      - paragraph: "/Servings: \\\\d+/"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
  // click the "Reset Filters button"
  await page.getByRole("button", { name: "Reset Filters" }).click();

  /* Filter by meal = Dinner */
  // select the meal type filter "Dinner"
  await page.getByRole("radio", { name: "Dinner" }).check();
  // assert the filtered recipe list only contains Chicken Ragout
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - paragraph: "Found 1 recipe:"
    - 'link /Chicken Ragout Servings: 4 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/1/chicken-ragout
      - paragraph: "Servings: 4"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
  // select the meal type filter "Any"
  await page
    .getByRole("radiogroup")
    .filter({ hasText: "AnyBreakfastLunchDinner" })
    .getByLabel("Any")
    .check();

  /* Filter by cuisine = American */
  // click the "Show More" button in the Cuisine filters section
  await page
    .locator("div")
    .filter({ hasText: /^CuisineAnyItalianMexicanChineseShow more$/ })
    .getByRole("button")
    .click();
  // select the cuisine type "American"
  await page.getByRole("radio", { name: "American" }).check();
  // assert the filtered recipe list only contains Maple Glazed Apple Blondies
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - paragraph: "Found 1 recipe:"
    - 'link /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/3/maple-glazed-apple-blondies
      - paragraph: "/Servings: \\\\d+/"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
  // click the "Reset Filters" button
  await page.getByRole("button", { name: "Reset Filters" }).click();

  /* Filter by dietary = Nut-Free */
  // hide the expanded cuisine list
  await page.getByRole("button", { name: "Hide" }).click();
  // click the "Show More" button in the Dietary Considerations filters section
  await page
    .locator("div")
    .filter({
      hasText: /^Dietary ConsiderationsAnyVeganVegetarianGluten-FreeShow more$/,
    })
    .getByRole("button")
    .click();
  // select the dietary restriction type "Nut-Free"
  await page.getByRole("radio", { name: "Nut-Free" }).check();
  // assert the filtered recipe list contains Fall Spice Chocolate Chip Cookies and Maple Glazed Apple Blondies
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - paragraph: "Found 2 recipes:"
    - 'link /Fall Spice Chocolate Chip Cookies Servings: 8 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/2/fall-spice-chocolate-chip-cookies
      - paragraph: "Servings: 8"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    - 'link /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/3/maple-glazed-apple-blondies
      - paragraph: "/Servings: \\\\d+/"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
  // click the "Reset Filters" button
  await page.getByRole("button", { name: "Reset Filters" }).click();
});

test("recipe search, multiple filters", async ({ page }) => {
  /* Filter by include ingredients = brown sugar and Cuisine = American */
  // select the textbox for "Include Ingredients"
  await page
    .getByTestId("include-ingredients")
    .getByRole("combobox", { name: "Ingredients" })
    .click();
  // enter "brown sugar" as the search term
  await page
    .getByTestId("include-ingredients")
    .getByRole("combobox", { name: "Ingredients" })
    .fill("brown sugar");
  // select "brown sugar"
  await page.getByRole("option", { name: "brown sugar", exact: true }).click();
  // click the "Show More" button in the Cuisine filters section
  await page
    .locator("div")
    .filter({ hasText: /^CuisineAnyItalianMexicanChineseShow more$/ })
    .getByRole("button")
    .click();
  // select the radio button for "American"
  await page.getByRole("radio", { name: "American" }).check();
  // assert the filtered recipes list only contains Maple Glazed Apple Blondies
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - paragraph: "Found 1 recipe:"
    - 'link /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/3/maple-glazed-apple-blondies
      - paragraph: "/Servings: \\\\d+/"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
  // click the "Reset Filters button"
  await page.getByRole("button", { name: "Reset Filters" }).click();

  /* Filter by include ingredients = semi-sweet chocolate chips and recipe type = Dessert */
  // click the textbox for include ingredients
  await page
    .getByTestId("include-ingredients")
    .getByRole("combobox", { name: "Ingredients" })
    .click();
  // enter the search term "chocolate chips"
  await page
    .getByTestId("include-ingredients")
    .getByRole("combobox", { name: "Ingredients" })
    .fill("chocolate chips");
  // select the dropdown option for semi-sweet chocolate chips
  await page
    .getByRole("option", { name: "semi-sweet chocolate chips" })
    .click();
  // select the radio button for recipe type = dessert
  await page.getByRole("radio", { name: "Dessert" }).check();
  // assert the filtered recipes list only contains Fall Spice Chocolate Chip Cookies
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - paragraph: "Found 1 recipe:"
    - 'link /Fall Spice Chocolate Chip Cookies Servings: 8 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/2/fall-spice-chocolate-chip-cookies
      - paragraph: "Servings: 8"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
  // click the "Reset Filters" button
  await page.getByRole("button", { name: "Reset Filters" }).click();

  /* Filter by include ingredients = brown sugar and exclude ingredients = semi-sweet chocolate chips */
  // click the textbox for include ingredients
  await page
    .getByTestId("include-ingredients")
    .getByRole("combobox", { name: "Ingredients" })
    .click();
  // enter the search term "brown sugar"
  await page
    .getByTestId("include-ingredients")
    .getByRole("combobox", { name: "Ingredients" })
    .fill("brown sugar");
  // select the dropdown option for brown sugar
  await page.getByRole("option", { name: "brown sugar", exact: true }).click();
  // click the textbox for exclude ingredients
  await page
    .getByTestId("exclude-ingredients")
    .getByRole("combobox", { name: "Ingredients" })
    .click();
  // enter the search term "chocolate ch"
  await page
    .getByTestId("exclude-ingredients")
    .getByRole("combobox", { name: "Ingredients" })
    .fill("chocolate ch");
  // select the dropdown option for semi-sweet chocolate chips
  await page
    .getByRole("option", { name: "semi-sweet chocolate chips" })
    .click();
  // assert the filtered recipes list only contains Maple Glazed Apple Blondies
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - paragraph: "Found 1 recipe:"
    - 'link /Maple Glazed Apple Blondies Servings: \\d+ Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
      - /url: /view/3/maple-glazed-apple-blondies
      - paragraph: "/Servings: \\\\d+/"
      - paragraph: "/Prep Time: \\\\d+ minutes/"
      - paragraph: "/Cook Time: \\\\d+ minutes/"
    `);
  // click the "Reset Filters" button
  await page.getByRole("button", { name: "Reset Filters" }).click();
});
