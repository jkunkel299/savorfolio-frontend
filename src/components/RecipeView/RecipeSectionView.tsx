import Box from "@mui/material/Box";
import type { RecipeSection, IngredientEntry, InstructionEntry, BaseIngredient, BaseInstruction } from "../../types";
import { Typography } from "@mui/material";
import IngredientViewList from "./IngredientViewList";
import InstructionViewList from "./InstructionViewList";

interface RecipeSectionViewProps {
    recipeSections?: RecipeSection[],
    ingredients?: BaseIngredient[];
    instructions?: BaseInstruction[];
}

export default function RecipeSectionView ({ 
    recipeSections,
    ingredients,
    instructions,
}: RecipeSectionViewProps) {
    // for ingredients and instructions that aren't assigned to any section
    const unsectionedIngredients = ingredients!.filter((ing: IngredientEntry) => !ing.sectionName);
    const unsectionedInstructions = instructions!.filter((ins: InstructionEntry) => !ins.sectionName);
    const ingHasSections = recipeSections!.length > 0 && ingredients!.some((ing) => ing.sectionName);
    const insHasSections = recipeSections!.length > 0 && instructions!.some((ins) => ins.sectionName);

    return (
        <Box>
            {/* ingredients */}
            <Typography variant="h4">Ingredients</Typography>
            {ingHasSections ? (
            // --- Render sectioned ingredients ---
                recipeSections!
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((section) => {
                    const sectionIngredients = ingredients!.filter(
                    (ing) => ing.sectionName === section.sectionName
                    );
                    if (sectionIngredients.length === 0) return null; // skip empty sections

                    return (
                    <Box key={section.id} sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                        {section.sectionName}
                        </Typography>
                        <IngredientViewList ingredients={sectionIngredients} />
                    </Box>
                    );
                })
            ) : (
                // --- Render unsectioned ingredients only ---
                <IngredientViewList ingredients={unsectionedIngredients} />
            )}
            
            {/* instructions */}
            <Typography variant="h4">Instructions</Typography>

            {insHasSections ? (
                // --- Render sectioned instructions ---
                recipeSections!
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((section) => {
                    const sectionInstructions = instructions!.filter(
                    (ins) => ins.sectionName === section.sectionName
                    );
                    if (sectionInstructions.length === 0) return null;

                    return (
                    <Box key={section.id} sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                        {section.sectionName}
                        </Typography>
                        <InstructionViewList instructions={sectionInstructions} />
                    </Box>
                    );
                })
            ) : (
                // --- Render unsectioned instructions only ---
                <InstructionViewList instructions={unsectionedInstructions} />
            )}
        </Box>
    )
}