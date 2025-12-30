import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { Controller, useFormContext } from "react-hook-form";
import type { NewRecipeDTO, SelectorType } from "../../types";
import { useFetchTags } from "../../hooks/useFetchTags";
import Box from "@mui/material/Box";

interface TagSelectorProps {
  type: SelectorType;
  label: string;
  multiple?: boolean;
}

export default function TagSelector({
  type,
  label,
  multiple = true,
}: TagSelectorProps) {
  const { options, loading } = useFetchTags(type);
  const { control } = useFormContext<NewRecipeDTO>();

  if (loading) return <Typography>Loading {label}...</Typography>;

  return (
    <Controller
      name={`recipeTags.${type}` as const}
      control={control}
      rules={{
        required: type === "recipe_type" ? "Recipe type is required" : false,
      }}
      render={({ field }) => (
        <FormGroup>
          <FormLabel
            sx={{ fontWeight: "bold" }}
            required={type == "recipe_type" ? true : false}
          >
            {label}
          </FormLabel>
          <Box
            sx={{
              ml: 1.5,
              maxHeight: "60vh",
              overflowY: "auto",
              pr: 1,
            }}
          >
            {multiple ? (
              // Multi-select (Checkbox)
              <FormGroup>
                {options.map((tag) => (
                  <FormControlLabel
                    key={tag}
                    control={
                      <Checkbox
                        checked={field.value?.includes(tag) || false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (Array.isArray(field.value)) {
                            // Multiple selection case
                            const newValue = checked
                              ? [...field.value, tag]
                              : field.value.filter((v) => v !== tag);
                            field.onChange(newValue);
                          } else {
                            // Single selection case — treat it as a single string
                            field.onChange(checked ? [tag] : []);
                          }
                        }}
                      />
                    }
                    label={tag}
                  />
                ))}
              </FormGroup>
            ) : (
              // Single-select (RadioGroup)
              <RadioGroup
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
              >
                {options.map((tag) => (
                  <FormControlLabel
                    key={tag}
                    value={tag}
                    control={<Radio />}
                    label={tag}
                  />
                ))}
              </RadioGroup>
            )}
          </Box>
        </FormGroup>
      )}
    />
  );
}
