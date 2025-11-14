import Switch from "@mui/material/Switch";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { RootState } from "../../react-redux/store";
import { useAppSelector } from "../../react-redux/hooks";
import { setUserId } from "../../react-redux/slices/recipeFiltersSlice";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ControlledSwitches() {
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    setChecked(isChecked);

    if (isChecked) {
      dispatch(setUserId(user!.id));
    } else {
      dispatch(setUserId(null));
    }
  };

  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={handleChange} />}
      label="Only my recipes"
      sx={{ variant: "body2", color: "text.secondary" }}
    />
  );
}
