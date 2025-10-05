import { useCallback, useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { createFilterOptions } from '@mui/material/Autocomplete';
import type { UnitsDTO } from '../../types';
import ingredientService from '../../api/ingredientApi';

interface UnitSearchProps {
    onUnitChange: (unit: UnitsDTO | null) => void;
}

export default function UnitSearch({ onUnitChange }: UnitSearchProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState<UnitsDTO[]>([]);
    const [inputValue, setInputValue] = useState('');

    const filterOptions = createFilterOptions<UnitsDTO>({
        stringify: (option) => `${option.name} ${option.abbreviation}`,
    });

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
            if (inputValue) {
                fetchUnits(inputValue);
            } else {
                setOptions([]);
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [inputValue, fetchUnits]);

    return (
        <Autocomplete
            id="units-selection"
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            loading={loading}
            getOptionLabel={(option) =>
                `${option.name} (${option.abbreviation})`
            }
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            filterOptions={filterOptions}
    
            onChange={(_, value) => {
                if (value) {
                    onUnitChange(value);
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="teaspoon / tsp"
                    label="Select Unit"
                    required
                />
            )}

        />
    )
}