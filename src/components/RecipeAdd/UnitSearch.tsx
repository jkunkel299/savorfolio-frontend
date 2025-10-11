import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { NewRecipeDTO, UnitsDTO } from '../../types';
import { useFetchUnits } from '../../utils/useFetchUnits';

export default function UnitSearch({ index }: { index: number}) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { options, loading } = useFetchUnits(inputValue);
    const { control, setValue, watch } = useFormContext<NewRecipeDTO>();

    const filterOptions = createFilterOptions<UnitsDTO>({
        stringify: (option) => `${option.name} ${option.abbreviation}`,
    });

    const unitName = watch(`Ingredients.${index}.UnitName`);
    const unitId = watch(`Ingredients.${index}.UnitId`);

    // Local state to store the selected option object
    const [selectedOption, setSelectedOption] = useState<UnitsDTO | null>(null);

    useEffect(() => {
        const found = options.find(opt => opt.id === unitId) ?? null;
        if (found) {
            setSelectedOption(found);
        } else if (unitId || unitName) {
            // If not in options, persist the previous selection as a minimal object
            setSelectedOption({
                id: unitId ?? 0,
                name: unitName ?? '',
                abbreviation: '',
        });
        } else {
            setSelectedOption(null);
        }
    }, [unitId, unitName, options]);

    return (
        <Controller 
            name={`Ingredients.${index}.UnitName`}
            control={control}
            rules={{required: "Unit is requried"}}
            render={({ field }) => (
                <Autocomplete
                    id="units-selection"
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
                        setValue(`Ingredients.${index}.UnitId`, newValue ? newValue.id : 0);
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