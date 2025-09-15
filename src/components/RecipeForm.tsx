import { useState, type ChangeEvent } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { Radio } from '@mui/material';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function RecipeForm() {
    const [tempField, setTempField] = useState('');
    const [tempUnit, setTempUnit] = useState('');

    const handleTempChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Remove any non-digit characters
        const numericValue = inputValue.replace(/[^0-9]/g, ''); 
        setTempField(numericValue);
    };

    return(
        <Grid container spacing={3}>
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="recipe-title" required>
                    Recipe Title
                </FormLabel>
                <OutlinedInput
                    id="recipe-title"
                    name="recipe-title"
                    type="text"
                    placeholder="Grandma's Chocolate Chip Cookies"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="servings" required>
                    Servings
                </FormLabel>
                <OutlinedInput
                    id="servings"
                    name="servings"
                    type="number"
                    placeholder="24"
                    required
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="prep-time" required>
                    Prep Time
                </FormLabel>
                <OutlinedInput
                    id="prep-time"
                    name="prep-time"
                    type="text"
                    inputProps={{
                        maxLength: 20
                    }}
                    placeholder="20 minutes"
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="cook-time">Cook Time</FormLabel>
                <OutlinedInput
                    id="cook-time"
                    name="cook-time"
                    type="text"
                    placeholder="1 hour"
                    inputProps={{
                        maxLength: 20
                    }}
                    size="small"
                />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="bake-temp">Bake Temperature</FormLabel>
                <OutlinedInput
                    id="bake-temp"
                    name="bake-temp"
                    type="number"
                    inputProps={{
                        inputMode: 'numeric', // Provides a numeric keyboard on mobile devices
                        pattern: '[0-9]*', // Provides a hint for numeric input, but validation is still needed
                    }}
                    value={tempField}
                    onChange={handleTempChange}
                    placeholder="350"
                    size="small"
                />
            </FormGrid>
            {tempField !== null && ( // only show the temperature units field if the bake temp field is filled out
               <FormGrid size={{ xs: 6 }}>
                    <FormControl>
                    <FormLabel id="temperature-unit">Unit</FormLabel>
                    <RadioGroup
                        aria-labelledby="temperature-unit"
                        defaultValue="F"
                        name="radio-buttons-group"
                        value={tempUnit}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTempUnit(e.target.value)}
                    >
                        <FormControlLabel value="F" control={<Radio />} label="F" />
                        <FormControlLabel value="C" control={<Radio />} label="C" />
                    </RadioGroup>
                    </FormControl>
                </FormGrid> 
            )}            
        </Grid>
    );
}