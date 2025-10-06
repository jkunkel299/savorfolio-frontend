export interface Recipe {
    id: number;
    name: string;
    servings: number | null;
    cookTime: string | null;
    prepTime: string | null;
    bakeTemp: number | null;
    tempUnit: string | null;
    // refine later
    // ingredientLists: unknown[];
    // instruction: string | null;
    // notes: unknown[];
    // recipeSections: unknown[];
}

export interface IngredientVariantDTO {
    id: number;
    name: string;
    typeId: number;
    ingredientCategory: string;
}

export interface UnitsDTO {
    id: number;
    name: string;
    abbreviation?: string;
}

export interface NewRecipeDTO {
    RecipeSummary: {
        Name: string;
        Servings: number | null;
        CookTime: string | null;
        PrepTime: string | null;
        BakeTemp: number | null;
        Temp_unit: string | null;
    };
    Ingredients: {
        IngredientOrder: number;
        IngredientId: number;
        IngredientName: string;
        Quantity: string;
        UnitId: number;
        UnitName: string;
        Qualifier: string | null;
    }[];
    Instructions: {
        StepNumber: number;
        InstructionText: string;
    }[];
    RecipeTags:{
        Meal?: string | null;
        Recipe_type: string;
        Cuisine?: string | null;
        Dietary?: string[];
    }
}

export type IngredientEntry = {
    name: string;
    quantity: string;
    unitId: number;
    unitName: string;
    qualifier: string | null;
}

export type InstructionEntry = {
    stepNumber: number;
    instructionText: string;
}