import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // go to search page
  await page.goto("/search");
});

test("can view a recipe", async ({ page }) => {
  // go to home page
  await page.getByRole("link").filter({ hasText: /^$/ }).click();
  // navigate to search page
  await page.getByRole("link", { name: "Search" }).click();
  // assert the page contains the recipe cards
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
  // click on the recipe card for fall spice chocolate chip cookies
  await page.getByRole('link', { name: 'Fall Spice Chocolate Chip' }).click();
  // assert the page contains the recipe data
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
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
  await page
    .getByRole("checkbox", { name: "12 tablespoons butter, salted" })
    .check();
  // assert the checked element
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - checkbox /\\d+ tablespoons butter, salted \\(cold, cut into cubes\\)/ [checked]
    - text: /\\d+ tablespoons butter, salted \\(cold, cut into cubes\\)/
    `);
  // uncheck the box
  await page
    .getByRole("checkbox", { name: "12 tablespoons butter, salted" })
    .uncheck();
  // use the back to search button to return to the search page
  await page.getByRole("button", { name: "Back to Search" }).click();
  // assert the page contains the recipe cards
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

test("can view a recipe with sections", async ({ page }) => {
  // go to home page
  await page.getByRole("link").filter({ hasText: /^$/ }).click();
  // navigate to search page
  await page.getByRole("link", { name: "Search" }).click();
  // assert the page contains the recipe cards
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
  // click on the recipe card for Maple Glazed Apple Blondies
  await page.getByRole('link', { name: 'Maple Glazed Apple Blondies' }).click();
  // assert the page contains the recipe data
  await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - heading "Maple Glazed Apple Blondies" [level=3]
    - heading "These chewy Maple Glazed Apple Blondies taste like sweet apple pie with a warm maple icing! This homemade apple blondie recipe is the perfect fall dessert! It's easy, super flavorful, and always a crowd pleaser!" [level=6]
    - paragraph: "Servings:"
    - paragraph: /\\d+/
    - paragraph: "Prep Time:"
    - paragraph: /\\d+ minutes/
    - paragraph: "Cook Time:"
    - paragraph: /\\d+ minutes/
    - paragraph: "Bake Temperature:"
    - paragraph: /\\d+ °F/
    - heading "Ingredients" [level=4]
    - heading "Apple Filling" [level=6]
    - checkbox "2 large apples (chopped finely)"
    - text: 2 large apples (chopped finely)
    - checkbox "2 tablespoons brown sugar"
    - text: 2 tablespoons brown sugar
    - checkbox "1 tablespoon butter, salted"
    - text: 1 tablespoon butter, salted
    - checkbox "1/2 teaspoon vanilla extract"
    - text: 1/2 teaspoon vanilla extract
    - checkbox "1/2 teaspoon cinnamon"
    - text: 1/2 teaspoon cinnamon
    - heading "Blondies" [level=6]
    - checkbox "2 cups all-purpose flour"
    - text: 2 cups all-purpose flour
    - checkbox "1 teaspoon baking powder (diced)"
    - text: 1 teaspoon baking powder (diced)
    - checkbox "1/2 teaspoon salt"
    - text: 1/2 teaspoon salt
    - checkbox "1 cup butter, salted (softened)"
    - text: 1 cup butter, salted (softened)
    - checkbox "1/4 cup white sugar"
    - text: 1/4 cup white sugar
    - checkbox "1 cup dark brown sugar"
    - text: 1 cup dark brown sugar
    - checkbox "2 large eggs"
    - text: 2 large eggs
    - checkbox "1 1/2 teaspoons vanilla extract"
    - text: 1 1/2 teaspoons vanilla extract
    - checkbox "1/2 teaspoon cinnamon"
    - text: 1/2 teaspoon cinnamon
    - heading "Maple Glaze" [level=6]
    - checkbox "2 tablespoons butter, salted"
    - text: 2 tablespoons butter, salted
    - checkbox "1/4 cup maple syrup (pure)"
    - text: 1/4 cup maple syrup (pure)
    - checkbox "1/2 cup powdered sugar"
    - text: 1/2 cup powdered sugar
    - checkbox "1/4 teaspoon vanilla extract"
    - text: 1/4 teaspoon vanilla extract
    - checkbox "1/8 teaspoon cinnamon"
    - text: 1/8 teaspoon cinnamon
    - heading "Instructions" [level=4]
    - heading "Apple Filling" [level=6]
    - paragraph: "1."
    - paragraph: On med-low heat, cook apple filling mixture for about 3-4 minutes. Pull off heat and allow to cool.
    - heading "Blondies" [level=6]
    - paragraph: "2."
    - paragraph: /Preheat oven to \\d+ and line an 11x7 pan with tin foil \\(or spray with pan with cooking spray\\)\\./
    - paragraph: "3."
    - paragraph: Cream butter until light and fluffy, about 1 minute. Add in brown sugar and granulated sugar, and mix until well combined.
    - paragraph: "4."
    - paragraph: Add in eggs, 1 at a time, beating well after each addition.
    - paragraph: "5."
    - paragraph: Add in salt and vanilla extract. Mix until combined.
    - paragraph: "6."
    - paragraph: In a separate bowl, mix flour, baking powder, and cinnamon together. Add to the wet ingredients and stir until combined.
    - paragraph: "7."
    - paragraph: In the bottom of the pan, spread half the blondie batter evenly, using a spatula (or your hands--batter is very thick, so I prefer to spread with my hands).
    - paragraph: "8."
    - paragraph: Spread apple filling all over the layer.
    - paragraph: "9."
    - paragraph: Top with remaining blondie batter and spread evenly.
    - paragraph: /\\d+\\./
    - paragraph: /Bake for \\d+-\\d+ minutes, or until the top is golden brown and a cake tester comes out clean\\./
    - heading "Maple Glaze" [level=6]
    - paragraph: /\\d+\\./
    - paragraph: /Melt butter, maple syrup, vanilla extract, and cinnamon over low heat\\. Once melted together, pull off the heat\\. Sift in powdered sugar, and whisk until fully combined\\. Allow to cool for 8-\\d+ minutes so the glaze can thicken\\./
    - paragraph: /\\d+\\./
    - paragraph: /Allow bars to cool for about \\d+ minutes, then pour the glaze over the bars and allow it to set\\./
    - paragraph: /\\d+\\./
    - paragraph: Slice into squares and enjoy!
    - separator
    - heading "Recipe Tags" [level=4]
    - heading "Recipe Type:" [level=5]
    - paragraph: Dessert
    - heading "Meal Type:" [level=5]
    - paragraph: Dessert
    - heading "Cuisine:" [level=5]
    - paragraph: American
    - heading "Dietary Considerations:" [level=5]
    - paragraph: Nut-Free
    - paragraph: Soy-Free
    `);
});
