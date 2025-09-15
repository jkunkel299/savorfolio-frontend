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