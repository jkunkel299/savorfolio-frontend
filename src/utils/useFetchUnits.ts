import { useState, useCallback, useEffect } from 'react';
import ingredientService from '../api/ingredientApi';
import type { UnitsDTO } from '../types';

export function useFetchUnits (searchTerm: string) {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<UnitsDTO[]>([]);

    const fetchUnits = useCallback(async (name: string) => {
        setLoading(true);
        let isActive = true; // mount flag inside effect to prevent stale state updates

        try {
            const response = await ingredientService.getUnitsByName(name);
            setOptions(response.data);
        } catch (err: unknown) {
            console.error(err || "Error fetching Units"); // fix this later
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
                fetchUnits(searchTerm);
            } else {
                setOptions([]);
            }
        }, 500);
        return () => {
            isActive = false; // stops any async updates after unmount
            clearTimeout(handler); // clears pending timeout
        }
    }, [searchTerm, fetchUnits]);

    return {options, loading};
}

