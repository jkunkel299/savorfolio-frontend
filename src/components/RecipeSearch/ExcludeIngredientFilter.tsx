import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../react-redux/store";
import { setExcludeIngredients } from "../../react-redux/slices/recipeFiltersSlice";
import type { IngredientVariantDTO } from "../../types";
import { useFetchIngredients } from "../../hooks/useFetchIngredients";

export default function IngredientExcludeFilter() {
  const dispatch = useDispatch();
  const excludeIngredients = useSelector(
    (state: RootState) => state.recipeFilters.excludeIngredients
  );
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
      value={excludeIngredients}
      getOptionLabel={(option) => option.name}
      onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
      filterSelectedOptions
      onChange={(_event, newValue: IngredientVariantDTO[]) => {
        dispatch(setExcludeIngredients(newValue));
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Ingredients" />
      )}
    />
  );
}
