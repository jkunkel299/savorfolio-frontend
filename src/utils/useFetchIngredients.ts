import { useState, useCallback, useEffect } from 'react';
import ingredientService from '../api/ingredientApi';
import type { IngredientVariantDTO } from '../types';

export function useFetchIngredients (searchTerm: string) {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<IngredientVariantDTO[]>([]);

    const fetchIngredients = useCallback(async (term: string) => {
        setLoading(true);
        try {
            const response = await ingredientService.getIngredientByTerm(term);
            setOptions(response.data);
        } catch (err: unknown) {
            console.error(err || "Error fetching Ingredients"); // fix this later
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                fetchIngredients(searchTerm);
            } else {
                setOptions([]);
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm, fetchIngredients]);

    return {options, loading};
}

