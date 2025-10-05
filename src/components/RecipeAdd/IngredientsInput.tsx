import { useState } from "react";
import { useFetchIngredients } from "../../utils/useFetchIngredients";
import Autocomplete from "@mui/material/Autocomplete";
// import type { IngredientVariantDTO } from "../../types";
import TextField from "@mui/material/TextField";

// interface IngredientSearchProps {
//     onSelect: (ingredients: IngredientVariantDTO) => void;
// }

export default function IngredientsInput(/* { onSelect }: IngredientSearchProps */) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const { options, loading } = useFetchIngredients(inputValue);

    return (
        <Autocomplete 
            id="ingredient-input"
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            loading={loading}
            getOptionLabel={(option) => option.name}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            filterSelectedOptions
            sx={{ minWidth:300}}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Search Ingredient..."
                />
            )}
        />
    )
}