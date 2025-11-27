import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../react-redux/store";
import { setIncludeIngredients } from "../../react-redux/slices/recipeFiltersSlice";
import type { IngredientVariantDTO } from "../../types";
import { useFetchIngredients } from "../../hooks/useFetchIngredients";

export default function IngredientIncludeFilter() {
  const dispatch = useDispatch();
  const includeIngredients = useSelector(
    (state: RootState) => state.recipeFilters.includeIngredients
  );

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { options, loading } = useFetchIngredients(inputValue);

  return (
    <Autocomplete
      multiple
      id="include-ingredients"
      data-testid="include-ingredients"
      slotProps={{
        clearIndicator: {
          ...({
            "data-testid": "include-clear",
          } as React.HTMLAttributes<HTMLButtonElement>),
        },
      }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      loading={loading}
      value={includeIngredients}
      getOptionLabel={(option) => option.name}
      onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
      filterSelectedOptions
      onChange={(_event, newValue: IngredientVariantDTO[]) => {
        dispatch(setIncludeIngredients(newValue));
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Ingredients" />
      )}
    />
  );
}
