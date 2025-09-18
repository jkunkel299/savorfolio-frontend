import { useState, useEffect, useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { IngredientVariantDTO } from '../types';
import ingredientService from '../api/ingredientApi';
// import { useFetchIngredients } from '../utils/useFetchIngredients';

interface IngredientIncludeFilterProps {
    onIngredientsChange: (ingredients: IngredientVariantDTO[]) => void;
}

export default function IngredientIncludeFilter({ onIngredientsChange }: IngredientIncludeFilterProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<IngredientVariantDTO[]>([]);
    const [inputValue, setInputValue] = useState('');

    // fetch ingredients from API
    const fetchIngredients = useCallback(async (searchTerm: string) => {
        setLoading(true);
        try {
            const response = await ingredientService.getIngredientByTerm(searchTerm);
            setOptions(response.data);
        } catch (err: unknown) {
            console.error(err || "Error fetching Ingredients"); // fix this later
        } finally {
            setLoading(false);
        }
    }, []);
    
    // Trigger API call when inputValue changes
    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue) {
                fetchIngredients(inputValue);
            } else {
                setOptions([]);
            }
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, fetchIngredients]);

    return (
        <Autocomplete
            multiple
            id="include-ingredients"
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            loading={loading}
            getOptionLabel={(option) => option.name}
            onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
            filterSelectedOptions

            onChange={(_event, newValue: IngredientVariantDTO[]) => {
                onIngredientsChange(newValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search"
                    placeholder="Ingredients"
                />
            )}
        />
    )
}
