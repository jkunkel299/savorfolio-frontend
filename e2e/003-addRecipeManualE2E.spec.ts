import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // go to search page
    await page.goto('/');
});

test('can add a recipe manually', async ({ page }) => {
    // from the homepage, use the nav bar to navigate to the 'Add Recipe' page
    await page.getByRole('link', { name: 'Add Recipe' }).click();
    // assert the first page of the add recipes form is visible - recipe summary
    await expect(page.locator('#root')).toContainText('Add RecipeThe BasicsRecipe Title *Servings *Prep TimeCook TimeBake TemperatureNext');
    // click on the text box for the recipe title
    await page.getByRole('textbox', { name: 'Recipe Title' }).click();
    // add the title 'Scrambled eggs'
    await page.getByRole('textbox', { name: 'Recipe Title' }).fill('Scrambled eggs');
    // tab to the next text entry - servings
    await page.getByRole('textbox', { name: 'Recipe Title' }).press('Tab');
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
    await expect(page.locator('#root')).toContainText('Add RecipeTags - Describe the RecipeMeal TypeBreakfastLunchDinnerDessertSnackRecipe TypeMainSideDessertSauceAppetizerDrinkCuisine TypeItalianMexicanChineseJapaneseIndianThaiFrenchSpanishGreekKoreanVietnameseLebaneseMoroccanEthiopianBrazilianArgentinianCaribbeanAmericanMiddleEasternTurkishHungarianBavarianDietary ConsiderationsVeganVegetarianGluten-FreeDairy-FreeNut-FreeSoy-FreeEgg-FreeHalalKosherKetoPaleoLow-SodiumLow-SugarWhole30BackNext');
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

    // click on the 'add an ingredient' button - a new ingredient row is shown
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    // enter '2' in the quantity text box
    await page.getByRole('textbox', { name: 'Quantity' }).fill('2');
    // tab to the next input - select units
    await page.getByRole('textbox', { name: 'Quantity' }).press('Tab');
    // enter 'tab' into the units combobox, shows a dynamic list of options
    await page.getByRole('combobox', { name: 'Select Unit' }).fill('tab');
    // select 'Tablespoon' from the available options
    await page.getByRole('option', { name: 'Tablespoon' }).click();
    // tab to the next input - select ingredient
    await page.getByRole('combobox', { name: 'Select Unit' }).press('Tab');
    // enter 'butter' into the ingredients combobox, shows a dynamic list of options
    await page.getByRole('combobox', { name: 'Select Ingredient' }).fill('butter');
    // select 'butter, salted' from the available options
    await page.getByRole('option', { name: 'butter, salted' }).click();
    // click on the 'Add an Ingredient button - a new ingredient row is shown
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    // follow the steps to add three more ingredients to the ingredients list
    await page.locator('input[name="Ingredients.1.Quantity"]').click();
    await page.locator('input[name="Ingredients.1.Quantity"]').fill('2');
    await page.locator('input[name="Ingredients.1.Quantity"]').press('Tab');
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).fill('whole');
    await page.getByRole('option', { name: 'Whole' }).click();
    await page.locator('#ingredient-input-1').click();
    await page.locator('#ingredient-input-1').fill('egg');
    await page.getByRole('option', { name: 'egg', exact: true }).click();
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(1).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(1).fill('to taste');
    await page.getByRole('option', { name: 'to taste' }).click();
    await page.locator('#ingredient-input-2').click();
    await page.locator('#ingredient-input-2').fill('salt');
    await page.getByRole('option', { name: 'salt', exact: true }).click();
    await page.getByRole('button', { name: 'Add an Ingredient' }).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(2).click();
    await page.getByRole('combobox', { name: 'teaspoon / tsp' }).nth(2).fill('to ta');
    await page.getByRole('option', { name: 'to taste' }).click();
    await page.locator('#ingredient-input-3').click();
    await page.locator('#ingredient-input-3').fill('pepp');
    await page.getByRole('option', { name: 'black pepper' }).click();

    // click the 'Next' button - navigates to the instructions page
    await page.getByRole('button', { name: 'Next' }).click();

    // click the 'Back' button - navigates to the ingredients page
    await page.getByRole('button', { name: 'Back' }).click();

    // assert the ingredients list state has persisted
    await expect(page.locator('#root')).toContainText('Add RecipeIngredients ListSelect UnitSelect UnitSelect IngredientSelect IngredientSelect UnitSelect UnitSelect IngredientSelect IngredientSelect UnitSelect UnitSelect IngredientSelect IngredientSelect UnitSelect UnitSelect IngredientSelect IngredientAdd an IngredientBackNext');
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
    await page.locator('input[name="Instructions.1.InstructionText"]').click();
    await page.locator('input[name="Instructions.1.InstructionText"]').fill('crack eggs into the pan');
    await page.getByRole('button', { name: 'Add an Instruction' }).click();
    await page.locator('input[name="Instructions.2.InstructionText"]').click();
    await page.locator('input[name="Instructions.2.InstructionText"]').fill('scramble.');
    await page.getByRole('button', { name: 'Add an Instruction' }).click();
    await page.locator('input[name="Instructions.3.InstructionText"]').click();
    await page.locator('input[name="Instructions.3.InstructionText"]').fill('season with salt and pepper, to taste.');
    // click the 'Add an Instruction' button - shows a new instruction row
    await page.getByRole('button', { name: 'Add an Instruction' }).click();
    // click the 'delete' button to delete the new instruction row
    await page.getByRole('button', { name: 'delete' }).nth(4).click();
    // assert the page contains the instructions list
    await expect(page.locator('#root')).toContainText('Add RecipeInstructions List1.2.3.4.Add an InstructionBackNext');

    // click the 'Next' button - navigates to the recipe review page
    await page.getByRole('button', { name: 'Next' }).click();

    // assert the page contains the recipe data entered in the previous actions
    await expect(page.locator('#root')).toContainText('Add RecipeReview Your RecipeTitle: Scrambled eggs Servings: 1Prep Time: 5 minutesCook Time: 5 minutesTagsMeal: Breakfast Recipe Type: Main Cuisine: American Dietary Considerations: Gluten-FreeVegetarianIngredients2 Tablespoon butter, salted2 Whole egg to taste salt to taste black pepperInstructions1. melt butter in the pan on medium heat2. crack eggs into the pan3. scramble.4. season with salt and pepper, to taste.BackSubmit Recipe');
    // click the 'Submit Recipe' button - calls the API and navigates to the recipe confirmation page
    await page.getByRole('button', { name: 'Submit Recipe' }).click();

    // assert the page contains the expected confirmation text
    await expect(page.locator('#root')).toContainText('Recipe Saved!');

    // use the nav bar to navigate to the recipe search page
    await page.getByRole('link', { name: 'Search' }).click();

    // assert the search page now contains the added recipe for 'Scrambled eggs'
    await expect(page.locator('#root')).toContainText('Chicken RagoutServings: 4Prep Time: 10 minutesCook Time: 20 minutesFall Spice Chocolate Chip CookiesServings: 8Prep Time: 15 minutesCook Time: 10 minutesScrambled eggsServings: 1Prep Time: 5 minutesCook Time: 5 minutes');
});

test('tests functionality related to bake temperature', async ({ page }) => {
    // from the homepage, use the nav bar to navigate to the 'Add Recipe' page
    await page.getByRole('link', { name: 'Add Recipe' }).click();
    // add the recipe summary information
    await page.getByRole('textbox', { name: 'Recipe Title' }).click();
    await page.getByRole('textbox', { name: 'Recipe Title' }).fill('Baked');
    await page.getByRole('textbox', { name: 'Recipe Title' }).press('Tab');
    await page.getByRole('textbox', { name: 'Servings' }).fill('1');
    await page.getByRole('textbox', { name: 'Servings' }).press('Tab');
    await page.getByRole('textbox', { name: 'Prep Time' }).fill('5 minutes');
    await page.getByRole('textbox', { name: 'Cook Time' }).click();
    await page.getByRole('textbox', { name: 'Cook Time' }).fill('5 minutes');
    await page.locator('#bake-temp').click();
    // fill in the bake temp field with '350' - the temperature units field appears
    await page.locator('#bake-temp').fill('350');
    // assert the page now contains the temperature units field
    await expect(page.locator('#root')).toContainText('The BasicsRecipe Title *Servings *Prep TimeCook TimeBake TemperatureUnitFCNext');
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
    await page.getByRole('combobox', { name: 'Select Unit' }).fill('whole');
    await page.getByRole('option', { name: 'Whole' }).click();
    await page.getByRole('combobox', { name: 'Select Ingredient' }).click();
    await page.getByRole('combobox', { name: 'Select Ingredient' }).fill('egg');
    await page.getByRole('option', { name: 'egg', exact: true }).click();
    // click the 'Next' button - navigates to the instructions page
    await page.getByRole('button', { name: 'Next' }).click();
    // add an instruction
    await page.getByRole('button', { name: 'Add an Instruction' }).click();
    await page.getByRole('textbox', { name: 'Instruction text' }).click();
    await page.getByRole('textbox', { name: 'Instruction text' }).fill('Bake - this is a test');
    // click the 'Next' button - navigates to the recipe confirmation page
    await page.getByRole('button', { name: 'Next' }).click();
    // assert the review page contains the data for the bake temperature and unit "Bake Temperature: 350 °F"
    await expect(page.locator('#root')).toContainText('Review Your RecipeTitle: Baked Servings: 1Prep Time: 5 minutesCook Time: 5 minutesBake Temperature: 350 °FTagsMeal: Breakfast Recipe Type: Main Cuisine: American Dietary Considerations: VegetarianGluten-FreeIngredients2 Whole eggInstructions1. Bake - this is a testBackSubmit Recipe');
});