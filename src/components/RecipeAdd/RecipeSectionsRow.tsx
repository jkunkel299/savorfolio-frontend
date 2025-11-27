import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormContext } from "react-hook-form";
import type { NewRecipeDTO } from "../../types";

interface ReceipeSectionRowProps {
  index: number;
  onChange: (index: number, updated: Partial<NewRecipeDTO>) => void;
  onDelete: () => void;
}

export default function RecipeSectionsRow({
  index,
  onDelete,
}: ReceipeSectionRowProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<NewRecipeDTO>();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      {/* Show Section Number */}
      <Typography {...register(`recipeSections.${index}.sortOrder`)}>
        {index + 1}.
      </Typography>

      {/* Section Name */}
      <TextField
        type="text"
        multiline
        placeholder="Section Name"
        {...register(`recipeSections.${index}.sectionName` as const, {
          required: "Section Name is required",
        })}
        sx={{ width: "90%", maxWidth: 1000 }}
      />

      {/* Delete Button */}
      <IconButton
        aria-label="delete"
        type="button"
        onClick={onDelete}
        color="primary"
        size="small"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>

      {/* Error message */}
      {errors.instructions?.[index] && (
        <Typography color="error">Fill out required fields. </Typography>
      )}
    </Box>
  );
}
