import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // go to search page
    await page.goto('/');
});

test('can add a recipe manually', async ({ page }) => {
    // from the homepage, use the nav bar to navigate to the 'Add Recipe' page
    await page.getByRole('link', { name: 'Add Recipe' }).click();
    // click on the button to add a recipe manually
    await page.getByRole('button', { name: 'Add Recipe Manually →' }).click();
    // assert the first page of the add recipes form is visible - recipe summary
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Add Recipe" [level=4]
      - heading "The Basics" [level=4]
      - text: Recipe Title
      - textbox "Recipe Title"
      - text: Recipe Description
      - textbox "Add a description here"
      - text: Servings
      - textbox "Servings"
      - text: Prep Time
      - textbox "Prep Time"
      - text: Cook Time
      - textbox "Cook Time"
      - text: Bake Temperature
      - spinbutton
      - text: Does the recipe have sections?
      - radiogroup:
        - radio "Yes"
        - text: "Yes"
        - radio "No" [checked]
        - text: "No"
      - button "Cancel"
      - button "Next" [disabled]
      `);
    
    // click on the text box for the recipe title
    await page.getByRole('textbox', { name: 'Recipe Title' }).click();
    // add the title 'Scrambled eggs'
    await page.getByRole('textbox', { name: 'Recipe Title' }).fill('Scrambled eggs');
    // tab to the next text entry - description
    await page.getByRole('textbox', { name: 'Recipe Title' }).press('Tab');
    // enter a basic description
    await page.getByRole('textbox', { name: 'Add a description here' }).fill('A basic description');
    // tab to the next text entry - servings
    await page.getByRole('textbox', { name: 'Add a description here' }).press('Tab');
    // enter 1 as the number of servings
    await page.getByRole('textbox', { name: 'Servings' }).fill('1');
    // tab to the next text entry - prep time
    await page.getByRole('textbox', { name: 'Servings' }).press('Tab');
    // enter '5 minutes' as the prep time
    await page.getByRole('textbox', { name: 'Prep Time' }).fill('5 minutes');
    // tab to the next text entry - cook time
    await page.getByRole('textbox', { name: 'Prep Time' }).press('Tab');
    // enter '5 minutes' as the cook time
    await page.getByRole('textbox', { name: 'Cook Time' }).fill('5 minutes');

    // click on the 'Next' button - navigates to the tags page
    await page.getByRole('button', { name: 'Next' }).click();

    // assert the page contains the expected tags
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Tags - Describe the Recipe" [level=4]
      - text: Meal Type
      - radiogroup:
        - radio "Breakfast"
        - text: Breakfast
        - radio "Lunch"
        - text: Lunch
        - radio "Dinner"
        - text: Dinner
        - radio "Dessert"
        - text: Dessert
        - radio "Snack"
        - text: Snack
      - text: Recipe Type
      - radiogroup:
        - radio "Main" [checked]
        - text: Main
        - radio "Side"
        - text: Side
        - radio "Dessert"
        - text: Dessert
        - radio "Sauce"
        - text: Sauce
        - radio "Appetizer"
        - text: Appetizer
        - radio "Drink"
        - text: Drink
      - text: Cuisine Type
      - radiogroup:
        - radio "Italian"
        - text: Italian
        - radio "Mexican"
        - text: Mexican
        - radio "Chinese"
        - text: Chinese
        - radio "Japanese"
        - text: Japanese
        - radio "Indian"
        - text: Indian
        - radio "Thai"
        - text: Thai
        - radio "French"
        - text: French
        - radio "Spanish"
        - text: Spanish
        - radio "Greek"
        - text: Greek
        - radio "Korean"
        - text: Korean
        - radio "Vietnamese"
        - text: Vietnamese
        - radio "Lebanese"
        - text: Lebanese
        - radio "Moroccan"
        - text: Moroccan
        - radio "Ethiopian"
        - text: Ethiopian
        - radio "Brazilian"
        - text: Brazilian
        - radio "Argentinian"
        - text: Argentinian
        - radio "Caribbean"
        - text: Caribbean
        - radio "American"
        - text: American
        - radio "Middle Eastern"
        - text: Middle Eastern
        - radio "Turkish"
        - text: Turkish
        - radio "Hungarian"
        - text: Hungarian
        - radio "Bavarian"
        - text: Bavarian
        - radio "Mediterranean"
        - text: Mediterranean
      - text: Dietary Considerations
      - checkbox "Vegan"
      - text: Vegan
      - checkbox "Vegetarian"
      - text: Vegetarian
      - checkbox "Gluten-Free"
      - text: Gluten-Free
      - checkbox "Dairy-Free"
      - text: Dairy-Free
      - checkbox "Nut-Free"
      - text: Nut-Free
      - checkbox "Soy-Free"
      - text: Soy-Free
      - checkbox "Egg-Free"
      - text: Egg-Free
      - checkbox "Halal"
      - text: Halal
      - checkbox "Kosher"
      - text: Kosher
      - checkbox "Keto"
      - text: Keto
      - checkbox "Paleo"
      - text: Paleo
      - checkbox "Low-Sodium"
      - text: Low-Sodium
      - checkbox "Low-Sugar"
      - text: Low-Sugar
      - checkbox "Whole30"
      - text: Whole30
      - button "Cancel"
      - button "Back"
      - button "Next"
      `);
    
    // click on the radio button for meal type - 'Breakfast'
    await page.getByRole('radio', { name: 'Breakfast' }).check();
    // click on the radio button for cuisine - 'American'
    await page.getByRole('radio', { name: 'American' }).check();
    // click on the checkbox for dietary consideration - 'Gluten-Free'
    await page.getByRole('checkbox', { name: 'Gluten-Free' }).check();
    // click on the checkbox for dietary consideration - 'Vegetarian'
    await page.getByRole('checkbox', { name: 'Vegetarian' }).check();

    // click on the 'Back' button - navigates the recipe summary page
    await page.getByRole('button', { name: 'Back' }).click();

    // assert the title field still contains 'Scrambled eggs'
    await expect(page.getByRole('textbox', { name: 'Recipe Title' })).toHaveValue('Scrambled eggs');
    // assert the servings field still contains '1'
    await expect(page.getByRole('textbox', { name: 'Servings' })).toHaveValue('1');
    // assert the prep time field still contains '5 minutes'
    await expect(page.getByRole('textbox', { name: 'Prep Time' })).toHaveValue('5 minutes');
    // assert the cook time field still contains '5 minutes'
    await expect(page.getByRole('textbox', { name: 'Cook Time' })).toHaveValue('5 minutes');
    // assert the bake temp field is still empty
    await expect(page.locator('#bake-temp')).toBeEmpty();

    // click on the 'Next' button - navigates to the tags page
    await page.getByRole('button', { name: 'Next' }).click();

    // assert the 'breakfast' meal type is still checked
    await expect(page.getByRole('radio', { name: 'Breakfast' })).toBeChecked();
    // assert the 'American' cuisine type is still checked
    await expect(page.getByRole('radio', { name: 'American' })).toBeChecked();
    // assert the 'Gluten-Free' dietary consideration type is still checked
    await expect(page.getByRole('checkbox', { name: 'Gluten-Free' })).toBeChecked();
    // assert the 'Vegetarian' dietary consideration type is still checked
    await expect(page.getByRole('checkbox', { name: 'Vegetarian' })).toBeChecked();

    // click the 'Next' button - navigates to the ingredients page
    await page.getByRole('button', { name: 'Next' }).click();

    // assert the ingredients page is as expected when blank

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Ingredients List" [level=4]
      - paragraph: Enter the ingredients in the recipe. Start with the quantity, then search for the unit, then search for the ingredient name, then add any descriptors or qualifiers (e.g., chopped finely, shredded, diced, etc.)
      - button "Add an Ingredient"
      - button "Cancel"
      - button "Back"
      - button "Next"
      `);
    // click on the 'add an ingredient' button - a new ingredient row is shown
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.getByRole('textbox', { name: 'Quantity' }).click();
    // enter '2' in the quantity text box
    await page.getByRole('textbox', { name: 'Quantity' }).fill('2');
    // tab to the next input - select units
    await page.getByRole('textbox', { name: 'Quantity' }).press('Tab');
    // enter 'tab' into the units combobox, shows a dynamic list of options
    await page.getByRole('combobox', { name: 'Select Unit' }).fill('tab');
    // select 'tablespoons' from the available options
    await page.getByRole('option', { name: 'tablespoons' }).click();
    // tab to the next input - select ingredient
    await page.getByRole('combobox', { name: 'Select Unit' }).press('Tab');
    // enter 'butter' into the ingredients combobox, shows a dynamic list of options
    await page.getByRole('combobox', { name: 'Select Ingredient' }).fill('butter');
    // select 'butter, salted' from the available options
    await page.getByRole('option', { name: 'butter, salted' }).click();
    // click on the 'Add an Ingredient button - a new ingredient row is shown
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    // follow the steps to add three more ingredients to the ingredients list
    await page.locator('input[name="ingredients.1.quantity"]').fill('2');
    await page.locator('input[name="ingredients.1.quantity"]').press('Tab');
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).fill('large');
    await page.getByRole('option', { name: 'large' }).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).press('Tab');
    await page.locator('#ingredient-input-1').fill('egg');
    await page.getByRole('option', { name: 'eggs', exact: true }).click();
    await page.locator('#ingredient-input-1').press('Tab');
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.locator('input[name="ingredients.2.quantity"]').press('Tab');
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(1).fill('to ta');
    await page.getByRole('option', { name: 'to taste' }).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(1).press('Tab');
    await page.locator('#ingredient-input-2').fill('salt');
    await page.getByRole('option', { name: 'salt', exact: true }).click();
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(2).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(2).fill('to ta');
    await page.getByRole('option', { name: 'to taste' }).click();
    await page.locator('#ingredient-input-3').click();
    await page.locator('#ingredient-input-3').fill('pepper');
    await page.getByRole('option', { name: 'black pepper' }).click();

    // click the 'Next' button - navigates to the instructions page
    await page.getByRole('button', { name: 'Next' }).click();

    // click the 'Back' button - navigates to the ingredients page
    await page.getByRole('button', { name: 'Back' }).click();

    // assert the ingredients list state has persisted
    
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Ingredients List" [level=4]
      - paragraph: Enter the ingredients in the recipe. Start with the quantity, then search for the unit, then search for the ingredient name, then add any descriptors or qualifiers (e.g., chopped finely, shredded, diced, etc.)
      - textbox "Quantity"
      - text: Select Unit
      - combobox "Select Unit Select Unit Select Unit Select Unit"
      - button "Open"
      - text: Select Ingredient
      - combobox "Select Ingredient"
      - button "Open"
      - textbox "Qualifier"
      - button "delete"
      - textbox "Quantity"
      - text: Select Unit
      - combobox "teaspoon / tsp"
      - button "Open"
      - text: Select Ingredient
      - combobox "Select Ingredient"
      - button "Open"
      - textbox "Qualifier"
      - button "delete"
      - textbox "Quantity"
      - text: Select Unit
      - combobox "teaspoon / tsp"
      - button "Open"
      - text: Select Ingredient
      - combobox "Select Ingredient"
      - button "Open"
      - textbox "Qualifier"
      - button "delete"
      - textbox "Quantity"
      - text: Select Unit
      - combobox "teaspoon / tsp"
      - button "Open"
      - text: Select Ingredient
      - combobox "Select Ingredient"
      - button "Open"
      - textbox "Qualifier"
      - button "delete"
      - button "Add an Ingredient"
      - button "Cancel"
      - button "Back"
      - button "Next"
      `);
    
    await expect(page.locator('input[name="ingredients.0.quantity"]')).toHaveValue('2');
    await expect(page.getByRole('combobox', { name: 'Select Unit Select Unit' })).toHaveValue('tablespoons');
    await expect(page.locator('#ingredient-input-0')).toHaveValue('butter, salted');
    await expect(page.locator('textarea[name="ingredients.0.qualifier"]')).toBeEmpty();
    // add another ingredient
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(3).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(3).fill('to');
    await page.getByRole('option', { name: 'to taste' }).click();
    // click the 'delete' button to delete the added ingredient
    await page.getByRole('button', { name: 'delete' }).nth(4).click();

    // click the 'Next' button - navigates to the instructions page
    await page.getByRole('button', { name: 'Next' }).click();

    // click the 'Add an Instruction' button - shows a new instruction row
    await page.getByRole('button', { name: 'Add an Instruction' }).click();
    // click on the 'Instruction text' input box
    await page.getByRole('textbox', { name: 'Instruction text' }).click();
    // enter the instruction text
    await page.getByRole('textbox', { name: 'Instruction text' }).fill('melt butter in the pan on medium heat');
    // click the 'Add an Instruction' button - shows a new instruction row
    await page.getByRole('button', { name: 'Add an Instruction' }).click();
    // add another three instructions using the same steps
    await page.locator('textarea[name="instructions.1.instructionText"]').click();
    await page.locator('textarea[name="instructions.1.instructionText"]').fill('crack eggs into the pan');
    await page.getByRole('button', { name: 'Add an Instruction' }).click();
    await page.locator('textarea[name="instructions.2.instructionText"]').click();
    await page.locator('textarea[name="instructions.2.instructionText"]').fill('scramble.');
    await page.getByRole('button', { name: 'Add an Instruction' }).click();
    await page.locator('textarea[name="instructions.3.instructionText"]').click();
    await page.locator('textarea[name="instructions.3.instructionText"]').fill('season with salt and pepper, to taste.');
    // click the 'Add an Instruction' button - shows a new instruction row
    await page.getByRole('button', { name: 'Add an Instruction' }).click();
    // click the 'delete' button to delete the new instruction row
    await page.getByRole('button', { name: 'delete' }).nth(4).click();
    // assert the page contains the instructions list
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Instructions List" [level=4]
      - paragraph: "1."
      - textbox "Instruction text": melt butter in the pan on medium heat
      - button "delete"
      - paragraph: "2."
      - textbox "Instruction text": crack eggs into the pan
      - button "delete"
      - paragraph: "3."
      - textbox "Instruction text"
      - button "delete"
      - paragraph: "4."
      - textbox "Instruction text": season with salt and pepper, to taste.
      - button "delete"
      - button "Add an Instruction"
      - button "Cancel"
      - button "Back"
      - button "Next"
      `);

    // click the 'Next' button - navigates to the recipe review page
    await page.getByRole('button', { name: 'Next' }).click();

    // assert the page contains the recipe data entered in the previous actions

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Review Your Recipe" [level=4]
      - heading "Scrambled eggs" [level=3]
      - heading "A basic description" [level=6]
      - paragraph: "Servings:"
      - paragraph: "1"
      - paragraph: "Prep Time:"
      - paragraph: 5 minutes
      - paragraph: "Cook Time:"
      - paragraph: 5 minutes
      - heading "Ingredients" [level=4]
      - checkbox "2 tablespoons butter, salted"
      - text: 2 tablespoons butter, salted
      - checkbox "2 large eggs"
      - text: 2 large eggs
      - checkbox "salt to taste"
      - text: salt to taste
      - checkbox "black pepper to taste"
      - text: black pepper to taste
      - heading "Instructions" [level=4]
      - paragraph: "1."
      - paragraph: melt butter in the pan on medium heat
      - paragraph: "2."
      - paragraph: crack eggs into the pan
      - paragraph: "3."
      - paragraph: scramble.
      - paragraph: "4."
      - paragraph: season with salt and pepper, to taste.
      - separator
      - heading "Recipe Tags" [level=4]
      - heading "Recipe Type:" [level=5]
      - paragraph: Main
      - heading "Meal Type:" [level=5]
      - paragraph: Breakfast
      - heading "Cuisine:" [level=5]
      - paragraph: American
      - heading "Dietary Considerations:" [level=5]
      - paragraph: Gluten-Free
      - button "Cancel"
      - button "Back"
      - button "Submit Recipe"
      `);
    // click the 'Submit Recipe' button - calls the API and navigates to the recipe confirmation page
    await page.getByRole('button', { name: 'Submit Recipe' }).click();

    // assert the page contains the expected confirmation text
    await expect(page.locator('#root')).toContainText('Recipe Saved!');

    // use the nav bar to navigate to the recipe search page
    await page.getByRole('link', { name: 'Search' }).click();

    // assert the search page now contains the added recipe for 'Scrambled eggs'

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
      `);
});

test('tests functionality related to bake temperature', async ({ page }) => {
    // from the homepage, use the nav bar to navigate to the 'Add Recipe' page
    await page.getByRole('link', { name: 'Add Recipe' }).click();
    // click on the button to add a recipe manually
    await page.getByRole('button', { name: 'Add Recipe Manually →' }).click();
    // add the recipe summary information
    await page.getByRole('textbox', { name: 'Recipe Title' }).click();
    await page.getByRole('textbox', { name: 'Recipe Title' }).fill('Baked');
    await page.getByRole('textbox', { name: 'Recipe Title' }).press('Tab');
    await page.getByRole('textbox', { name: 'Add a description here' }).fill('Basic Description');
    await page.getByRole('textbox', { name: 'Add a description here' }).press('Tab');
    await page.getByRole('textbox', { name: 'Servings' }).fill('1');
    await page.getByRole('textbox', { name: 'Servings' }).press('Tab');
    await page.getByRole('textbox', { name: 'Prep Time' }).fill('5 minutes');
    await page.getByRole('textbox', { name: 'Cook Time' }).click();
    await page.getByRole('textbox', { name: 'Cook Time' }).fill('5 minutes');
    await page.locator('#bake-temp').click();
    // fill in the bake temp field with '350' - the temperature units field appears
    await page.locator('#bake-temp').fill('350');
    // assert the page now contains the temperature units field

    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "The Basics" [level=4]
      - text: Recipe Title
      - textbox "Recipe Title"
      - text: Recipe Description
      - textbox "Add a description here"
      - text: Servings
      - textbox "Servings"
      - text: Prep Time
      - textbox "Prep Time": 5 minutes
      - text: Cook Time
      - textbox "Cook Time": 5 minutes
      - text: Bake Temperature
      - spinbutton: /\\d+/
      - text: Unit
      - radiogroup:
        - radio "F"
        - text: F
        - radio "C"
        - text: C
      - text: Does the recipe have sections?
      - radiogroup:
        - radio "Yes"
        - text: "Yes"
        - radio "No" [checked]
        - text: "No"
      - button "Cancel"
      - button "Next"
      `);
    // click on the radio button for 'F'
    await page.getByRole('radio', { name: 'F' }).check();
    // click the 'Next' button - navigates to the tags page
    await page.getByRole('button', { name: 'Next' }).click();
    // add recipe tags
    await page.locator('label').filter({ hasText: 'Breakfast' }).click();
    await page.getByRole('radio', { name: 'American' }).check();
    await page.getByRole('checkbox', { name: 'Vegetarian' }).check();
    await page.getByRole('checkbox', { name: 'Gluten-Free' }).check();
    // click the 'Next' button - navigates to the ingredients page
    await page.getByRole('button', { name: 'Next' }).click();
    // add two ingredients
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.getByRole('textbox', { name: 'Quantity' }).fill('2');
    await page.getByRole('combobox', { name: 'Select Unit' }).click();
    await page.getByRole('combobox', { name: 'Select Unit' }).fill('large');
    await page.getByRole('option', { name: 'large' }).click();
    await page.getByRole('combobox', { name: 'Select Ingredient' }).click();
    await page.getByRole('combobox', { name: 'Select Ingredient' }).fill('egg');
    await page.getByRole('option', { name: 'eggs', exact: true }).click();
    // click the 'Next' button - navigates to the instructions page
    await page.getByRole('button', { name: 'Next' }).click();
    // add an instruction
    await page.getByRole('button', { name: 'Add an Instruction' }).click();
    await page.getByRole('textbox', { name: 'Instruction text' }).click();
    await page.getByRole('textbox', { name: 'Instruction text' }).fill('Bake - this is a test');
    // click the 'Next' button - navigates to the recipe review page
    await page.getByRole('button', { name: 'Next' }).click();
    // assert the review page contains the data for the bake temperature and unit "Bake Temperature: 350 °F"
    
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - heading "Review Your Recipe" [level=4]
      - heading "Baked" [level=3]
      - heading "Basic Description" [level=6]
      - paragraph: "Servings:"
      - paragraph: "1"
      - paragraph: "Prep Time:"
      - paragraph: 5 minutes
      - paragraph: "Cook Time:"
      - paragraph: 5 minutes
      - paragraph: "Bake Temperature:"
      - paragraph: /\\d+ °F/
      - heading "Ingredients" [level=4]
      - checkbox "2 large eggs"
      - text: 2 large eggs
      - heading "Instructions" [level=4]
      - paragraph: "1."
      - paragraph: Bake - this is a test
      - separator
      - heading "Recipe Tags" [level=4]
      - heading "Recipe Type:" [level=5]
      - paragraph: Main
      - heading "Meal Type:" [level=5]
      - paragraph: Breakfast
      - heading "Cuisine:" [level=5]
      - paragraph: American
      - heading "Dietary Considerations:" [level=5]
      - paragraph: Vegetarian
      - paragraph: Gluten-Free
      - button "Cancel"
      - button "Back"
      - button "Submit Recipe"
      `);
    await page.getByRole('button', { name: 'Cancel' }).click();
});