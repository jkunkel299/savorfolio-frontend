import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import type { IngredientVariantDTO } from "../../types";
import { useFetchIngredients } from "../../hooks/useFetchIngredients";

interface IngredientExcludeFilterProps {
  value: IngredientVariantDTO[];
  onIngredientsChange: (ingredients: IngredientVariantDTO[]) => void;
}

export default function IngredientExcludeFilter({
  onIngredientsChange,
  value,
}: IngredientExcludeFilterProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { options, loading } = useFetchIngredients(inputValue);

  return (
    <Autocomplete
      multiple
      id="exclude-ingredients"
      data-testid="exclude-ingredients"
      slotProps={{
        clearIndicator: {
          ...({
            "data-testid": "exclude-clear",
          } as React.HTMLAttributes<HTMLButtonElement>),
        },
      }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      loading={loading}
      value={value}
      getOptionLabel={(option) => option.name}
      onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
      filterSelectedOptions
      onChange={(_event, newValue: IngredientVariantDTO[]) => {
        onIngredientsChange(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Ingredients" />
      )}
    />
  );
}
