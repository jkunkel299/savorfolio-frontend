import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { NewRecipeDTO, UnitsDTO } from '../../types';
import { useFetchUnits } from '../../utils/useFetchUnits';

type UnitOption = UnitsDTO & {
  displayName: string;
  isPlural?: boolean;
};

export default function UnitSearch({ index }: { index: number}) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { options: rawUnits, loading } = useFetchUnits(inputValue);
    const { control, setValue, watch } = useFormContext<NewRecipeDTO>();

    const filterOptions = createFilterOptions<UnitOption>({
        stringify: (option) => `${option.name} ${option.pluralName} ${option.abbreviation}`,
    });

    const unitName = watch(`ingredients.${index}.unitName`);
    const unitId = watch(`ingredients.${index}.unitId`);

    // Local state to store the selected option object
    const [selectedOption, setSelectedOption] = useState<UnitOption | null>(null);

    const options = useMemo<UnitOption[]>(() => {
        if (!rawUnits) return [];
        return rawUnits.flatMap((u) => {
            const base: UnitOption = {
                ...u, displayName: u.name, isPlural: false,
            };
            const plural: UnitOption | null = u.pluralName ? {
                ...u, displayName: u.pluralName, isPlural: true,
            } : null;
            return plural ? [base, plural] : [base];
        });        
    }, [rawUnits]);

    useEffect(() => {
        const found = options.find(opt => opt.id === unitId && opt.displayName === unitName) ?? null;
        if (found) {
            setSelectedOption(found);
        } else if (unitId || unitName) {
            // If not in options, persist the previous selection as a minimal object
            setSelectedOption({
                id: unitId ?? 0,
                name: unitName ?? '',
                abbreviation: '',
                pluralName: '',
                displayName: unitName ?? '',
        } as UnitOption);
        } else {
            setSelectedOption(null);
        }
    }, [unitId, unitName, options]);

    return (
        <Controller 
            name={`ingredients.${index}.unitName`}
            control={control}
            // rules={{required: "Unit is requried"}}
            render={({ field }) => (
                <Autocomplete
                    id="units-selection"
                    value={selectedOption}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    options={options}
                    loading={loading}
                    getOptionLabel={(option) => option.displayName}
                    onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                    onChange={(_, newValue: UnitOption | null) => {
                        field.onChange(newValue?.displayName ?? '');
                        setValue(`ingredients.${index}.unitId`, newValue ? newValue.id : 0);
                        setSelectedOption(newValue);
                    }}
                    filterOptions={filterOptions}
                    sx={{ minWidth:200}}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="teaspoon / tsp"
                            label="Select Unit"
                        />
                    )}

                />
            )}                
        />
        
    )
}