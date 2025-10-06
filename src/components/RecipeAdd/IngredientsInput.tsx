import { useEffect, useState } from "react";
import { useFetchIngredients } from "../../utils/useFetchIngredients";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import type { NewRecipeDTO, IngredientVariantDTO } from "../../types";

export default function IngredientsInput({ index }: { index: number }) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { options, loading } = useFetchIngredients(inputValue);
    const { control, setValue, watch } = useFormContext<NewRecipeDTO>();

    const filterOptions = createFilterOptions<IngredientVariantDTO>({
        stringify: (option) => `${option.name}`,
    });

    const ingredientName = watch(`Ingredients.${index}.IngredientName`);
    const ingredientId = watch(`Ingredients.${index}.IngredientId`);

    // Local state to store the selected option object
    const [selectedOption, setSelectedOption] = useState<IngredientVariantDTO | null>(null);

    useEffect(() => {
        const found = options.find(opt => opt.id === ingredientId) ?? null;
        if (found) {
            setSelectedOption(found);
        } else if (ingredientId || ingredientName) {
            // If not in options, persist the previous selection as a minimal object
            setSelectedOption({
                id: ingredientId ?? 0,
                name: ingredientName ?? '',
                typeId: 0,
                ingredientCategory:''
        });
        } else {
            setSelectedOption(null);
        }
    }, [ingredientId, ingredientName, options]);

    return (
        <Controller
            name={`Ingredients.${index}.IngredientName`}
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
                    getOptionLabel={(option) => option.name}
                    onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                    onChange={(_, newValue) => {
                        field.onChange(newValue?.name);
                        setValue(`Ingredients.${index}.IngredientId`, newValue ? newValue.id : 0);
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