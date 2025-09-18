export interface Recipe {
    id: number;
    name: string;
    servings: number | null;
    cookTime: string | null;
    prepTime: string | null;
    // refine later
    ingredientLists: unknown[];
    instruction: string | null;
    notes: unknown[];
    recipeSections: unknown[];
}

export interface IngredientVariantDTO {
    id: number;
    name: string;
    typeId: number;
    ingredientCategory: string;
}