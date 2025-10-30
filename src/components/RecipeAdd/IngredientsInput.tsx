import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useFetchIngredients } from "../../utils/useFetchIngredients";
import type { NewRecipeDTO, IngredientVariantDTO } from "../../types";

export type IngredientOption = IngredientVariantDTO & {
    displayName: string;
    isPlural?: boolean;
};

export default function IngredientsInput({ index }: { index: number }) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { options: rawIngredients, loading } = useFetchIngredients(inputValue);
    const { control, setValue, watch } = useFormContext<NewRecipeDTO>();

    const filterOptions = createFilterOptions<IngredientOption>({
        stringify: (option) => `${option.name} ${option.pluralName}`,
    });

    const ingredientName = watch(`ingredients.${index}.ingredientName`);
    const ingredientId = watch(`ingredients.${index}.ingredientId`);

    // Local state to store the selected option object
    const [selectedOption, setSelectedOption] = useState<IngredientOption | null>(null);

    const options = useMemo<IngredientOption[]>(() => {
        if (!rawIngredients) return [];
        return rawIngredients.flatMap((i) => {
            const base: IngredientOption = {
                ...i, displayName: i.name, isPlural: false,
            };
            const plural: IngredientOption | null = i.pluralName ? {
                ...i, displayName: i.pluralName, isPlural: true,
            } : null;
            return plural ? [base, plural] : [base];
        });        
    }, [rawIngredients]);

    useEffect(() => {
        const found = options.find(opt => opt.id === ingredientId && opt.displayName === ingredientName) ?? null;
        if (found) {
            setSelectedOption(found);
        } else if (ingredientId || ingredientName) {
            // If not in options, persist the previous selection as a minimal object
            setSelectedOption({
                id: ingredientId ?? 0,
                name: ingredientName ?? '',
                typeId: 0,
                ingredientCategory:'',
                pluralName:'',
                displayName: ingredientName ?? '',
        });
        } else {
            setSelectedOption(null);
        }
    }, [ingredientId, ingredientName, options]);

    return (
        <Controller
            name={`ingredients.${index}.ingredientName`}
            control={control}
            rules={{required: "Ingredient is requried"}}
            render={({field}) => (
                <Autocomplete 
                    id={`ingredient-input-${index}`}
                    value={selectedOption}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    options={options}
                    loading={loading}
                    getOptionLabel={(option) => option.displayName}
                    onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                    onChange={(_, newValue: IngredientOption | null) => {
                        field.onChange(newValue?.displayName ?? '');
                        setValue(`ingredients.${index}.ingredientId`, newValue ? newValue.id : 0);
                        setSelectedOption(newValue);;
                    }}
                    filterOptions={filterOptions}
                    sx={{ minWidth:300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Select Ingredient..."
                            label="Select Ingredient"
                        />
                    )}
                />
            )}
        />
        
    )
}