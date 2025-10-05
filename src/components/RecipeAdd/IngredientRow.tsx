// import ListItem from "@mui/material/ListItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import type { IngredientEntry, UnitsDTO } from "../../types";
import Typography from "@mui/material/Typography";
import UnitSearch from "./UnitSearch";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface IngredientRowProps {
    entry: IngredientEntry;
    index: number;
    onChange: (index: number, updated: IngredientEntry) => void;
    onDelete: (index: number) => void;
}

export default function IngredientRow ({ entry, index, onChange, onDelete }: IngredientRowProps) {
    return (
        <Box 
            sx={{ display: "flex", 
                gap: 2, 
                alignItems: "center", 
                width: "100%",
                flexWrap: "wrap", 
            }} 
        >             
            {/* Quantity */}
            <OutlinedInput 
                required
                type="text"
                placeholder="Quantity (e.g., 1/3, 1/2)"
                value={entry.quantity}
                onChange={(e) => {
                    onChange(index, {...entry, quantity: e.target.value})
                }}
                // style={{ width: 60 }}
                sx={{ width: "fit-content", flex: "0 0 auto" }} 
                inputProps={{ maxLength: 10 }} // varchar(10)
            />

            {/* Unit */}
            <Box sx={{ width: "fit-content", flex: "0 0 180px", minWidth: 120 }}> 
            <UnitSearch 
                onUnitChange={(unit: UnitsDTO | null) => {
                    onChange(index, {
                        ...entry,
                        unitId: unit?.id ?? 0,
                        unitName: unit?.name ?? "",
                    })
                }} 
            />
            </Box>
            
            {/* Ingredient Name */}
            <Typography sx={{ flex: 1, minWidth: 120 }}>{entry.variant.name}</Typography> 

            {/* Qualifier */}
            <OutlinedInput 
                required
                type="text"
                placeholder="Qualifier (e.g., chopped)"
                value={entry.qualifier}
                onChange={(e) => {
                    onChange(index, {...entry, qualifier: e.target.value})
                }}
                // style={{ width: 60 }}
                sx={{ width: "fit-content", flex: "0 0 auto" }}// was width: 160
                inputProps={{
                    maxLength: 20
                }}
            />
            
            {/* Delete Button */}
            <IconButton
                aria-label="delete"
                onClick={() => onDelete(index)}
                color="error"
                size="small"
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Box>
    )
}