import OutlinedInput from "@mui/material/OutlinedInput";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../react-redux/store";
import { setRecipeName } from "../../react-redux/slices/recipeFiltersSlice";

export default function RecipeNameFilter() {
  const dispatch = useDispatch();
  const recipeName = useSelector(
    (state: RootState) => state.recipeFilters.recipeName
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setRecipeName(value));
  };

  return (
    <>
      <OutlinedInput
        value={recipeName}
        onChange={handleChange}
        placeholder="Recipe Title"
      />
    </>
  );
}
