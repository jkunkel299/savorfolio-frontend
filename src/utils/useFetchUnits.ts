import { useState, useCallback, useEffect } from 'react';
import ingredientService from '../api/ingredientApi';
import type { UnitsDTO } from '../types';

export function useFetchUnits (searchTerm: string) {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<UnitsDTO[]>([]);

    const fetchUnits = useCallback(async (name: string) => {
        setLoading(true);
        try {
            const response = await ingredientService.getUnitsByName(name);
            setOptions(response.data);
        } catch (err: unknown) {
            console.error(err || "Error fetching Units"); // fix this later
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                fetchUnits(searchTerm);
            } else {
                setOptions([]);
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm, fetchUnits]);

    return {options, loading};
}

