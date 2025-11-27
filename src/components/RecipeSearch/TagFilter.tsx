import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../react-redux/store";
import { setTags } from "../../react-redux/slices/recipeFiltersSlice";
import { useFetchTags } from "../../hooks/useFetchTags";
import type { SelectorType } from "../../types";

interface TagFilterProps {
  type: SelectorType;
  label: string;
  multiple?: boolean;
}

export default function TagFilter({ type, label, multiple }: TagFilterProps) {
  const dispatch = useDispatch();
  const selectedTags = useSelector(
    (state: RootState) => state.recipeFilters.tags[type]
  );
  const { options, loading } = useFetchTags(type);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = (tag: string) => {
    if (multiple == true) {
      const updated = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];
      dispatch(setTags({ type, tags: updated }));
    } else {
      // radio: single-select mode
      dispatch(setTags({ type, tags: [tag] }));
    }
  };

  const handleAnySelect = () => {
    dispatch(setTags({ type, tags: [] })); // clears filter for this type
  };

  if (loading) return <Typography>Loading {label}...</Typography>;

  const visibleOptions = showAll ? options : options.slice(0, 3);

  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      {multiple ? (
        // Multi-select (Checkbox)
        visibleOptions.map((tag) => (
          <FormControlLabel
            key={tag}
            control={
              <Checkbox
                checked={selectedTags.includes(tag)}
                onChange={() => handleToggle(tag)}
              />
            }
            label={tag}
          />
        ))
      ) : (
        // Single-select (RadioGroup)
        <RadioGroup
          value={selectedTags[0] || "any"} // default to "any" if no tag selected
          onChange={(e) =>
            e.target.value === "any"
              ? handleAnySelect()
              : handleToggle(e.target.value)
          }
        >
          <FormControlLabel value="any" control={<Radio />} label="Any" />
          {visibleOptions.map((tag) => (
            <FormControlLabel
              key={tag}
              value={tag}
              control={<Radio />}
              label={tag}
            />
          ))}
        </RadioGroup>
      )}

      {/* show more/hide button for collapsing the list */}
      {options.length > 3 && (
        <Button
          variant="text"
          size="small"
          sx={{ mt: 1, textTransform: "none" }}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Hide" : "Show more"}
        </Button>
      )}
    </FormGroup>
  );
}
