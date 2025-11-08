import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // go to search page
    await page.goto('/');
});

test('can add a new recipe by link', async ({ page }) => {
    // use the nav bar to navigate to the 'Add Recipe' page
    await page.getByRole('link', { name: 'Add Recipe' }).click();
    // click on the input to add a link
    await page.locator('.MuiInputBase-root').click();
    // enter the recipe URL https://www.gimmesomeoven.com/mushroom-stroganoff
    await page.getByRole('textbox', { name: 'Add a URL here' }).fill('https://www.gimmesomeoven.com/mushroom-stroganoff');
    // click on the 'submit URL' button
    await page.getByRole('button', { name: 'Submit URL' }).click();
    // assert that the first page of the add recipe form contains information from the scraped website
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "The Basics" [level=4]
      - text: Recipe Title
      - textbox "Recipe Title": Mushroom Stroganoff (Vegetarian)
      - text: Recipe Description
      - textbox "Add a description here": /This vegetarian Mushroom Stroganoff recipe is quick and easy to make in about \\d+ minutes, and it is perfectly comforting, hearty, savory, and delicious\\. Feel free to serve over egg noodles, traditional pasta, quinoa, veggies, or whatever sounds delicious\\./
      - text: Servings
      - textbox "Servings"
      - text: Prep Time
      - textbox "Prep Time": /\\d+ minutes/
      - text: Cook Time
      - textbox "Cook Time": /\\d+ minutes/
      - text: Bake Temperature
      - spinbutton
      - text: Does the recipe have sections?
      - radiogroup:
        - radio "Yes"
        - text: "Yes"
        - radio "No" [checked]
        - text: "No"
      - button "Cancel"
      - button "Next"
      `);
    // click on the text box for Servings and change the value to '4-6'
    await page.getByRole('textbox', { name: 'Servings' }).click();
    await page.getByRole('textbox', { name: 'Servings' }).fill('4 -6');
    await page.getByRole('textbox', { name: 'Servings' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Servings' }).press('ArrowLeft');
    await page.getByRole('textbox', { name: 'Servings' }).fill('4-6');

    // click the 'Next' button - navigates to the tags page
    await page.getByRole('button', { name: 'Next' }).click();
    // change cuisine to 'Bavarian'
    await page.getByRole('radio', { name: 'Bavarian' }).check();
    // click the checkbox for dietary consideration 'Vegetarian'
    await page.getByRole('checkbox', { name: 'Vegetarian' }).check();
    // click the 'Next' button - navigates to the ingredients page
    await page.getByRole('button', { name: 'Next' }).click();

    // assert that the list of scraped ingredients is visible as reference on the ingredients page
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Ingredients List" [level=4]
      - paragraph: Enter the ingredients in the recipe. Start with the quantity, then search for the unit, then search for the ingredient name, then add any descriptors or qualifiers (e.g., chopped finely, shredded, diced, etc.)
      - button "Add an Ingredient"
      - heading "Extracted Ingredients" [level=5]
      - list:
        - listitem: 1 pound wide egg noodles
        - listitem: 3 tablespoons butter, divided
        - listitem: 1 small white onion, thinly sliced
        - listitem: 4 cloves garlic, minced
        - listitem: 1 pound baby bella mushrooms*
        - listitem: 1/2 cup dry white wine
        - listitem: 1.5 cups vegetable stock
        - listitem: 1 tablespoon Worcestershire sauce (here is a vegetarian brand)
        - listitem: 3 1/2 tablespoons flour
        - listitem: 3 small sprigs of fresh thyme (or 1/4 teaspoon dried thyme)
        - listitem: 1/2 cup plain Greek yogurt or light sour cream
        - listitem: Kosher salt and freshly-cracked black pepper
        - listitem: "optional toppings: freshly-grated Parmesan cheese, chopped fresh parsley, extra black pepper"
      - button "Cancel"
      - button "Back"
      - button "Next"
      `);
    // add each ingredient
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.getByRole('textbox', { name: 'Quantity' }).fill('1');
    await page.getByRole('textbox', { name: 'Quantity' }).press('Tab');
    await page.getByRole('combobox', { name: 'Select Unit' }).fill('pound');
    await page.getByRole('option', { name: 'pound', exact: true }).click();
    await page.getByRole('combobox', { name: 'Select Unit' }).press('Tab');
    await page.getByRole('combobox', { name: 'Select Ingredient' }).fill('wide');
    await page.getByRole('option', { name: 'wide egg noodles' }).click();
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.1.quantity"]').fill('3');
    await page.locator('input[name="ingredients.1.quantity"]').press('Tab');
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).fill('tab');
    await page.getByRole('option', { name: 'tablespoons' }).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).press('Tab');
    await page.locator('#ingredient-input-1').fill('butter');
    await page.getByRole('option', { name: 'butter, salted' }).click();
    await page.locator('#ingredient-input-1').press('Tab');
    await page.locator('textarea[name="ingredients.1.qualifier"]').fill('divided');
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.2.quantity"]').fill('1');
    await page.locator('input[name="ingredients.2.quantity"]').press('Tab');
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(1).fill('small');
    await page.getByRole('option', { name: 'small' }).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(1).press('Tab');
    await page.locator('#ingredient-input-2').fill('white onion');
    await page.getByRole('option', { name: 'white onion', exact: true }).click();
    await page.locator('#ingredient-input-2').press('Tab');
    await page.locator('textarea[name="ingredients.2.qualifier"]').fill('thinly sliced');
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.3.quantity"]').fill('4');
    await page.locator('input[name="ingredients.3.quantity"]').press('Tab');
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(2).fill('cloves');
    await page.getByRole('option', { name: 'cloves' }).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(2).press('Tab');
    await page.locator('#ingredient-input-3').fill('garlic');
    await page.getByRole('option', { name: 'garlic', exact: true }).click();
    await page.locator('#ingredient-input-3').press('Tab');
    await page.locator('textarea[name="ingredients.3.qualifier"]').fill('minced');
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.4.quantity"]').fill('1');
    await page.locator('input[name="ingredients.4.quantity"]').press('Tab');
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(3).fill('pound');
    await page.getByRole('option', { name: 'pound', exact: true }).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(3).press('Tab');
    await page.locator('#ingredient-input-4').fill('baby bella');
    await page.getByRole('option', { name: 'baby bella mushrooms' }).click();
    await page.locator('#ingredient-input-4').press('Tab');
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.5.quantity"]').fill('1/2');
    await page.locator('input[name="ingredients.5.quantity"]').press('Tab');
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(4).fill('cup');
    await page.getByRole('option', { name: 'cup', exact: true }).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(4).press('Tab');
    await page.locator('#ingredient-input-5').fill('white wine');
    await page.getByRole('option', { name: 'white wine' }).click();
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.6.quantity"]').fill('1.5');
    await page.locator('input[name="ingredients.6.quantity"]').press('Tab');
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').fill('cup');
    await page.getByRole('option', { name: 'cups' }).click();
    await page.locator('#ingredient-input-6').click();
    await page.locator('#ingredient-input-6').fill('stock');
    await page.getByRole('option', { name: 'vegetable stock' }).click();
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.7.quantity"]').fill('1');
    await page.locator('input[name="ingredients.7.quantity"]').press('Tab');
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').fill('tables');
    await page.getByRole('option', { name: 'tablespoon', exact: true }).click();
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').press('Tab');
    await page.locator('#ingredient-input-7').fill('worces');
    await page.getByRole('option', { name: 'Worcestershire sauce' }).click();
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.8.quantity"]').fill('3 1/2');
    await page.locator('input[name="ingredients.8.quantity"]').press('Tab');
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').fill('tabl');
    await page.getByRole('option', { name: 'tablespoons' }).click();
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').press('Tab');
    await page.locator('#ingredient-input-8').fill('flour');
    await page.getByRole('option', { name: 'all-purpose flour' }).click();
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.9.quantity"]').fill('3');
    await page.locator('input[name="ingredients.9.quantity"]').press('Tab');
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').fill('sprigs');
    await page.getByRole('option', { name: 'sprigs' }).click();
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').press('Tab');
    await page.locator('#ingredient-input-9').fill('thyme');
    await page.getByRole('option', { name: 'thyme' }).click();
    await page.locator('textarea[name="ingredients.9.qualifier"]').click();
    await page.locator('textarea[name="ingredients.9.qualifier"]').fill('fresh, or 1/4 tsp dried');
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.10.quantity"]').fill('1/2');
    await page.locator('input[name="ingredients.10.quantity"]').press('Tab');
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').fill('cup');
    await page.getByRole('option', { name: 'cup', exact: true }).click();
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').press('Tab');
    await page.locator('#ingredient-input-10').fill('greek ');
    await page.getByRole('option', { name: 'Greek yogurt' }).click();
    await page.locator('#ingredient-input-10').press('Tab');
    await page.locator('textarea[name="ingredients.10.qualifier"]').fill('or light sour cream');
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.11.quantity"]').press('Tab');
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').fill('to taste');
    await page.getByRole('option', { name: 'to taste' }).click();
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').press('Tab');
    await page.locator('#ingredient-input-11').fill('salt');
    await page.getByRole('option', { name: 'salt', exact: true }).click();
    await page.locator('#ingredient-input-11').press('Tab');
    await page.locator('textarea[name="ingredients.11.qualifier"]').fill('Kosher');
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.12.quantity"]').press('Tab');
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').fill('to ta');
    await page.getByRole('option', { name: 'to taste' }).click();
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').press('Tab');
    await page.locator('#ingredient-input-12').fill('black pepper');
    await page.getByRole('option', { name: 'black pepper' }).click();
    await page.locator('textarea[name="ingredients.12.qualifier"]').click();
    await page.locator('textarea[name="ingredients.12.qualifier"]').fill('freshly cracked');
    await page.locator('textarea[name="ingredients.12.qualifier"]').click();
    await page.locator('textarea[name="ingredients.12.qualifier"]').press('ArrowLeft');
    await page.locator('textarea[name="ingredients.12.qualifier"]').press('ArrowLeft');
    await page.locator('textarea[name="ingredients.12.qualifier"]').press('ArrowLeft');
    await page.locator('textarea[name="ingredients.12.qualifier"]').fill('freshly-cracked');
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.13.quantity"]').press('Tab');
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').fill('to taste');
    await page.getByRole('option', { name: 'to taste' }).click();
    await page.locator('#ingredient-input-13').click();
    await page.locator('#ingredient-input-13').fill('parmesan');
    await page.getByRole('option', { name: 'parmesan cheese' }).click();
    await page.locator('#ingredient-input-13').press('Tab');
    await page.locator('textarea[name="ingredients.13.qualifier"]').fill('freshly-grated');
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.14.quantity"]').press('Tab');
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').fill('to taste');
    await page.getByRole('option', { name: 'to taste' }).click();
    await page.locator('.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.Mui-focused > #units-selection').press('Tab');
    await page.locator('#ingredient-input-14').fill('pars');
    await page.getByRole('option', { name: 'parsley' }).click();
    await page.locator('textarea[name="ingredients.14.qualifier"]').click();
    await page.locator('textarea[name="ingredients.14.qualifier"]').fill('chopped fresh');

    // click on the 'Next' button - navigates to the Instructions page
    await page.getByRole('button', { name: 'Next' }).click();
    // assert that the instructions page contains the scraped steps for the recipe
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Instructions List" [level=4]
      - paragraph: "1."
      - textbox "Instruction text": Cook egg noodles al dente in boiling, generously-salted water according to package instructions. (For optimal timing, I recommend actually adding the egg noodles to the boiling water at the same time that the vegetable stock is added to the stroganoff.)
      - button "delete"
      - paragraph: "2."
      - textbox "Instruction text": Melt 1 tablespoon butter in a large sauté pan over medium-high heat. Add onions and sauté for 5 minutes, stirring occasionally. Add the remaining 2 tablespoons butter, garlic and mushrooms, and stir to combine. Continue sautéing for an additional 5-7 minutes, until the mushrooms are cooked and tender. Add the white wine, and deglaze the pan by using a wooden spoon to scrape the brown bits off the bottom of the pan. Let the sauce simmer for 3 minutes.
      - button "delete"
      - paragraph: "3."
      - textbox "Instruction text": Meanwhile, in a separate bowl, whisk together the vegetable stock, Worcestershire and flour until smooth. Pour the vegetable stock mixture into the pan, along with the thyme, and stir to combine. Let the mixture simmer for an additional 5 minutes, stirring occasionally, until slightly thickened. Then, stir in the Greek yogurt (or sour cream) evenly into the sauce. Taste, and season with a generous pinch of two of salt and pepper as needed.
      - button "delete"
      - paragraph: "4."
      - textbox "Instruction text": Serve immediately over the egg noodles, garnished with your desired toppings.
      - button "delete"
      - button "Add an Instruction"
      - button "Cancel"
      - button "Back"
      - button "Next"
      `);

    // click the 'next' button - navigates to the recipe review page
    await page.getByRole('button', { name: 'Next' }).click();
    // assert the page contains the recipe data entered in the previous steps
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Review Your Recipe" [level=4]
      - heading "Mushroom Stroganoff (Vegetarian)" [level=3]
      - heading /This vegetarian Mushroom Stroganoff recipe is quick and easy to make in about \\d+ minutes, and it is perfectly comforting, hearty, savory, and delicious\\. Feel free to serve over egg noodles, traditional pasta, quinoa, veggies, or whatever sounds delicious\\./ [level=6]
      - paragraph: "Servings:"
      - paragraph: 4-6
      - paragraph: "Prep Time:"
      - paragraph: /\\d+ minutes/
      - paragraph: "Cook Time:"
      - paragraph: /\\d+ minutes/
      - heading "Ingredients" [level=4]
      - checkbox "1 pound wide egg noodles"
      - text: 1 pound wide egg noodles
      - checkbox "3 tablespoons butter, salted (divided)"
      - text: 3 tablespoons butter, salted (divided)
      - checkbox "1 small white onion (thinly sliced)"
      - text: 1 small white onion (thinly sliced)
      - checkbox "4 cloves garlic (minced)"
      - text: 4 cloves garlic (minced)
      - checkbox "1 pound baby bella mushrooms"
      - text: 1 pound baby bella mushrooms
      - checkbox "1/2 cup white wine"
      - text: 1/2 cup white wine
      - checkbox "1.5 cups vegetable stock"
      - text: 1.5 cups vegetable stock
      - checkbox "1 tablespoon Worcestershire sauce"
      - text: 1 tablespoon Worcestershire sauce
      - checkbox "3 1/2 tablespoons all-purpose flour"
      - text: 3 1/2 tablespoons all-purpose flour
      - checkbox "3 sprigs thyme (fresh, or 1/4 tsp dried)"
      - text: 3 sprigs thyme (fresh, or 1/4 tsp dried)
      - checkbox "1/2 cup Greek yogurt (or light sour cream)"
      - text: 1/2 cup Greek yogurt (or light sour cream)
      - checkbox "salt to taste (Kosher)"
      - text: salt to taste (Kosher)
      - checkbox "black pepper to taste (freshly-cracked)"
      - text: black pepper to taste (freshly-cracked)
      - checkbox "parmesan cheese to taste (freshly-grated)"
      - text: parmesan cheese to taste (freshly-grated)
      - checkbox "parsley to taste (chopped fresh)"
      - text: parsley to taste (chopped fresh)
      - heading "Instructions" [level=4]
      - paragraph: "1."
      - paragraph: Cook egg noodles al dente in boiling, generously-salted water according to package instructions. (For optimal timing, I recommend actually adding the egg noodles to the boiling water at the same time that the vegetable stock is added to the stroganoff.)
      - paragraph: "2."
      - paragraph: Melt 1 tablespoon butter in a large sauté pan over medium-high heat. Add onions and sauté for 5 minutes, stirring occasionally. Add the remaining 2 tablespoons butter, garlic and mushrooms, and stir to combine. Continue sautéing for an additional 5-7 minutes, until the mushrooms are cooked and tender. Add the white wine, and deglaze the pan by using a wooden spoon to scrape the brown bits off the bottom of the pan. Let the sauce simmer for 3 minutes.
      - paragraph: "3."
      - paragraph: Meanwhile, in a separate bowl, whisk together the vegetable stock, Worcestershire and flour until smooth. Pour the vegetable stock mixture into the pan, along with the thyme, and stir to combine. Let the mixture simmer for an additional 5 minutes, stirring occasionally, until slightly thickened. Then, stir in the Greek yogurt (or sour cream) evenly into the sauce. Taste, and season with a generous pinch of two of salt and pepper as needed.
      - paragraph: "4."
      - paragraph: Serve immediately over the egg noodles, garnished with your desired toppings.
      - separator
      - heading "Recipe Tags" [level=4]
      - heading "Recipe Type:" [level=5]
      - paragraph: Main
      - heading "Meal Type:" [level=5]
      - paragraph: Dinner
      - heading "Cuisine:" [level=5]
      - paragraph: Bavarian
      - heading "Dietary Considerations:" [level=5]
      - paragraph: Vegetarian
      - button "Cancel"
      - button "Back"
      - button "Submit Recipe"
      `);
    // submit the recipe
    await page.getByRole('button', { name: 'Submit Recipe' }).click();
});

test('can see the recipe added', async ({ page }) => {
    // go to the search page
    await page.getByRole('link', { name: 'Search' }).click();
    // assert the new recipe card is present
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
      - 'button "Scrambled eggs Servings: 1 Prep Time: 5 minutes Cook Time: 5 minutes"':
        - paragraph:
          - paragraph: "Servings: 1"
          - paragraph: "Prep Time: 5 minutes"
          - paragraph: "Cook Time: 5 minutes"
      - 'button /Mushroom Stroganoff \\(Vegetarian\\) Servings: 4-6 Prep Time: \\d+ minutes Cook Time: \\d+ minutes/':
        - paragraph:
          - paragraph: "Servings: 4-6"
          - paragraph: "/Prep Time: \\\\d+ minutes/"
          - paragraph: "/Cook Time: \\\\d+ minutes/"
      `);    
})