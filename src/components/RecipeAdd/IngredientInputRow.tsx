import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormContext, useWatch } from "react-hook-form";
import type { IngredientEntry, NewRecipeDTO } from "../../types";
import UnitSearch from "./UnitSearch";
import IngredientsInput from "./IngredientsInput";
import { SectionSelect } from "./SectionSelect";

interface IngredientRowProps {
  index: number;
  onChange: (index: number, updated: Partial<IngredientEntry>) => void;
  onDelete: () => void;
}

export default function IngredientInputRow({
  index,
  onDelete,
}: IngredientRowProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<NewRecipeDTO>();
  const recipeSections = useWatch({
    name: "recipeSections",
  });

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Sections (conditionally rendered) */}
      {recipeSections && recipeSections.length > 0 && (
        <SectionSelect
          {...register(`ingredients.${index}.sectionName` as const, {
            required: "Section name is required",
          })}
        />
      )}
      {/* Quantity */}
      <OutlinedInput
        type="text"
        placeholder="Quantity"
        {...register(`ingredients.${index}.quantity` as const, {
          maxLength: 10,
        })}
        sx={{
          width: { xs: "100%", md: "fit-content" },
          maxWidth: { md: "10%" },
        }}
      />
      {/* Unit */}
      <UnitSearch index={index} />

      {/* Ingredient Search */}
      <IngredientsInput index={index} />

      {/* Qualifier */}
      <TextField
        type="text"
        multiline
        placeholder="Qualifier"
        {...register(`ingredients.${index}.qualifier`, {
          validate: (value) => {
            // allow empty string or null
            if (!value) return true;
          },
        })}
        sx={{
          width: { xs: "100%", md: "auto" },
          minWidth: { md: "10vw" },
          flex: { xs: "1 1 100%", md: 1 },
        }}
      />

      {/* Delete Button */}
      <IconButton
        aria-label="delete"
        type="button"
        onClick={onDelete}
        color="primary"
        size="small"
        sx={{
          width: { xs: "100%", md: "auto" },
          display: "flex",
          justifyContent: { xs: "flex-end", md: "center" },
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      {errors.ingredients?.[index] && (
        <Typography>Fill out required fields. </Typography>
      )}
    </Box>
  );
}
