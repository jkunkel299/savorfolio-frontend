// --------------------
// Base Interfaces
// --------------------

export interface BaseSummary {
  name: string;
  servings?: number | null;
  cookTime?: string | null;
  prepTime?: string | null;
  bakeTemp?: number | null;
  temp_unit?: string | null;
  description?: string | null;
}

export interface BaseSection {
  sectionName: string;
  sortOrder: number;
  id?: number;
  recipeId?: number;
}

export interface BaseIngredient {
  ingredientOrder: number;
  ingredientId: number;
  ingredientName: string;
  ingNamePlural?: string | null;
  quantity: string;
  unitId: number;
  unitName: string;
  unitNamePlural?: string | null;
  qualifier?: string | null;
  sectionName?: string | null;
  sectionId?: number | null;
  id?: number;
  recipeId?: number;
}

export interface BaseInstruction {
  stepNumber: number;
  instructionText: string;
  sectionName?: string | null;
  sectionId?: number | null;
  id?: number;
  recipeId?: number;
}

export interface RecipeTags {
  meal?: string | null;
  recipe_type: string;
  cuisine?: string | null;
  dietary: string[];
}

// --------------------
// Core Entities
// --------------------

export interface Recipe {
  id: number;
  name: string;
  servings?: number | null;
  cookTime?: string | null;
  prepTime?: string | null;
  bakeTemp?: number | null;
  tempUnit?: string | null;
  description?: string | null;
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

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthReponse {
  token: string;
  user: User;
}

export interface UserLoginDTO {
  username: string;
  email: string;
  password: string;
}

export type RecipeSection = BaseSection;

// --------------------
// Form-Specific Types
// --------------------

export type IngredientEntry = Pick<
  BaseIngredient,
  | "ingredientName"
  | "ingNamePlural"
  | "quantity"
  | "unitId"
  | "unitName"
  | "unitNamePlural"
  | "qualifier"
  | "sectionName"
  | "sectionId"
>;

export type InstructionEntry = Pick<
  BaseInstruction,
  "stepNumber" | "instructionText" | "sectionName" | "sectionId"
>;

export type SelectorType = "meal" | "recipe_type" | "cuisine" | "dietary";

// --------------------
// DTOs
// --------------------

export interface NewRecipeDTO {
  recipeSummary: BaseSummary;
  recipeSections?: BaseSection[];
  ingredients: BaseIngredient[];
  instructions: BaseInstruction[];
  recipeTags: RecipeTags;
}

export interface FullRecipeDTO {
  userId: number;
  recipeId: number;
  recipeSummary: BaseSummary & { id?: number };
  recipeSections?: BaseSection[];
  recipeTags: RecipeTags & { recipeId?: number };
  ingredients: BaseIngredient[];
  instructions: BaseInstruction[];
}

export interface DraftRecipeDTO {
  userId: number;
  recipeSummary: BaseSummary;
  recipeSections?: BaseSection[];
  ingredientsString: string[];
  instructions: BaseInstruction[];
  recipeTags: RecipeTags;
}

export interface RecipeFilterDTO {
  includeIngredientsIds?: number[];
  excludeIngredientsIds?: number[];
  Recipe_typeString?: string;
  MealString?: string;
  CuisineString?: string;
  Dietary?: string[];
}