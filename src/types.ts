export interface Recipe {
    id: number;
    name: string;
    servings: number | null;
    cookTime: string | null;
    prepTime: string | null;
    bakeTemp: number | null;
    tempUnit: string | null;
    description: string | null;
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
    pluralName?: string;
}

export interface UnitsDTO {
    id: number;
    name: string;
    abbreviation?: string;
    pluralName: string;
}

export interface NewRecipeDTO {
    recipeSummary: {
        name: string;
        servings: number | null;
        cookTime: string | null;
        prepTime: string | null;
        bakeTemp: number | null;
        temp_unit: string | null;
        description: string | null;
    };
    ingredients: {
        ingredientOrder: number;
        ingredientId: number;
        ingredientName: string;
        ingNamePlural: string | null;
        quantity: string;
        unitId: number;
        unitName: string;
        unitPlural: string;
        qualifier: string | null;
    }[];
    instructions: {
        stepNumber: number;
        instructionText: string;
    }[];
    recipeTags:{
        meal?: string | null;
        recipe_type: string;
        cuisine?: string | null;
        dietary: string[];
    }
}

export type IngredientEntry = {
    name: string;
    plural: string | null;
    quantity: string;
    unitId: number;
    unitName: string;
    unitPlural: string;
    qualifier: string | null;
}

export type InstructionEntry = {
    stepNumber: number;
    instructionText: string;
}

export interface FullRecipeDTO {
    recipeId: number;
    recipeSummary: {
        id?: number;
        name: string;
        servings: number | null;
        cookTime: string | null;
        prepTime: string | null;
        bakeTemp: number | null;
        temp_unit: string | null;
        description: string | null;
    };
    recipeTags:{
        recipeId?: number;
        meal?: string | null;
        recipe_type: string;
        cuisine?: string | null;
        dietary: string[];
    }
    ingredients: {
        id?: number;
        recipeId?: number;
        ingredientOrder: number;
        ingredientId: number;
        ingredientName: string;
        ingNamePlural: string | null;
        quantity: string;
        unitId: number;
        unitName: string;
        unitNamePlural?: string;
        qualifier: string | null;
    }[];
    instructions: {
        id?: number;
        recipeId?: number;
        stepNumber: number;
        instructionText: string;
    }[];
}

export interface DraftRecipeDTO {
    recipeSummary: {
        name: string;
        servings: number | null;
        cookTime: string | null;
        prepTime: string | null;
        bakeTemp: number | null;
        temp_unit: string | null;
        description: string | null;
    };
    ingredientsString: string[];
    instructions: {
        stepNumber: number;
        instructionText: string;
    }[];
    recipeTags:{
        meal?: string | null;
        recipe_type: string;
        cuisine?: string | null;
        dietary: string[];
    }
}