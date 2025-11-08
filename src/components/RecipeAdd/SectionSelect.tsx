import { Controller, useFormContext, useWatch, /* type Control, */ type FieldPath } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { NewRecipeDTO, RecipeSection } from "../../types";

interface SectionSelectProps {
    name: FieldPath<NewRecipeDTO>;
    label?: string;
}

export function SectionSelect({
    name,
    label = "Section",
}: SectionSelectProps) {
    const { control } = useFormContext<NewRecipeDTO>();
    // Watch the parent sections array
    const sections = useWatch<NewRecipeDTO, "recipeSections">({
        control,
        name: "recipeSections",
    });

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                <Select 
                    {...field}
                    label={label}
                    displayEmpty
                    value={field.value ?? ""}
                    sx={{ minWidth: 300, width: "fit-content", flex: "0 0 auto" }}
                >
                    {/* --- Blank Option --- */}
                    <MenuItem value="">
                    <br/>
                    </MenuItem>

                    {/* --- Section Options --- */}
                    {Array.isArray(sections) &&
                    sections.map((section: RecipeSection, index: number) => (
                        <MenuItem key={index} value={section.sectionName}>
                        {section.sectionName}
                        </MenuItem>
                    ))}
                </Select>
                )}
            />
        </FormControl>
    );
}