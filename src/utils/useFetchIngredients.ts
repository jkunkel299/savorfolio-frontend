import { useState, useCallback, useEffect } from 'react';
import ingredientService from '../api/ingredientApi';
import type { IngredientVariantDTO } from '../types';

export function useFetchIngredients (searchTerm: string) {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<IngredientVariantDTO[]>([]);

    const fetchIngredients = useCallback(async (term: string) => {
        setLoading(true);
        let isActive = true; // mount flag inside effect to prevent stale state updates

        try {
            const response = await ingredientService.getIngredientByTerm(term);
            setOptions(response.data);
        } catch (err: unknown) {
            console.error(err || "Error fetching Ingredients"); // fix this later
        } finally {
            if (isActive) setLoading(false);
        }
        
        return () => { isActive = false }; // stops any async updates after unmount
    }, []);
    
    useEffect(() => {
        let isActive = true; // mount flag inside effect to prevent stale state updates

        const handler = setTimeout(() => {
            if (!isActive) return;

            if (searchTerm) {
                fetchIngredients(searchTerm);
            } else {
                setOptions([]);
            }
        }, 500);
        return () => {
            isActive = false; // stops any async updates after unmount
            clearTimeout(handler); // clears pending timeout
        }
    }, [searchTerm, fetchIngredients]);

    return {options, loading};
}

