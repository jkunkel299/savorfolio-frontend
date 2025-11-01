import { Controller, useWatch, type Control, type FieldPath } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { NewRecipeDTO, RecipeSection } from "../../types";

interface SectionSelectProps {
    control: Control<NewRecipeDTO>;
    name: FieldPath<NewRecipeDTO>;
    label?: string;
}

export function SectionSelect({
  control,
  name,
//   recipeSectionsField,
  label = "Section",
}: SectionSelectProps) {
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
            <Select {...field} label={label}>
                {sections && sections.map((section: RecipeSection, index: number) => (
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