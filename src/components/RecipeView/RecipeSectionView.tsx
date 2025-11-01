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
    // const unsectionedIngredients = ingredients.filter((ing: IngredientEntry) => !ing.sectionId);
    // const unsectionedInstructions = instructions.filter((ins: InstructionEntry) => !ins.sectionId);

    return (
        <Box>
            {/* Render each defined section ingredients */}
            <Typography variant="h4">Ingredients</Typography>
            {recipeSections!
                .sort((a: RecipeSection, b: RecipeSection) => a.sortOrder - b.sortOrder)
                .map((section: RecipeSection) => {
                    const sectionIngredients = ingredients!.filter(
                        (ing: IngredientEntry) => ing.sectionName === section.sectionName
                    );

                    return (
                        <Box key={section.id} sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                {section.sectionName}
                            </Typography>

                            {/* {sectionIngredients.length > 0 && ( */}
                                <>
                                    <IngredientViewList ingredients={sectionIngredients} />
                                </>
                            {/* )} */}
                        </Box>
                    )
                })}
            
            <Typography variant="h4">Instructions</Typography>
            {recipeSections!
                .sort((a: RecipeSection, b: RecipeSection) => a.sortOrder - b.sortOrder)
                .map((section: RecipeSection) => {
                    const sectionInstructions = instructions!.filter(
                        (ins: InstructionEntry) => ins.sectionName === section.sectionName
                    );

                    return (
                        <Box key={section.id} sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                {section.sectionName}
                            </Typography>

                            {sectionInstructions.length > 0 && (
                                <>
                                    <InstructionViewList instructions={sectionInstructions} />
                                </>
                            )}
                        </Box>
                    )
                })}
        </Box>
    )
}