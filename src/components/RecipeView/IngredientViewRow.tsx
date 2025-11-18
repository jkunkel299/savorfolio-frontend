import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import { useState } from "react";
import { parseQuantity } from "../../utils/parseQuantity";

interface IngredientViewRowProps {
  ingredientName: string;
  ingPluralName?: string | null;
  quantity: string;
  unitName: string;
  unitPluralName?: string | null;
  qualifier?: string | null;
}

export default function IngredientViewRow({
  ingredientName,
  ingPluralName,
  quantity,
  unitName,
  unitPluralName,
  qualifier,
}: IngredientViewRowProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const qtyNum = parseQuantity(quantity);

  const displayUnit = qtyNum > 1 && unitPluralName ? unitPluralName : unitName;

  const displayIngredient =
    qtyNum > 1 && ingPluralName ? ingPluralName : ingredientName;

  const content = (
    <>
      {quantity && <span>{quantity} </span>}
      {displayUnit && <span>{displayUnit} </span>}
      <span>{displayIngredient}</span>
      {qualifier && <span> ({qualifier})</span>}
    </>
  );

  const contentWithoutQuantity = (
    <>
      <span>{ingredientName} </span>
      <span>{unitName} </span>
      {qualifier && <span> ({qualifier})</span>}
    </>
  );

  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label={
          checked ? (
            <s>{quantity ? content : contentWithoutQuantity}</s>
          ) : (
            <>{quantity ? content : contentWithoutQuantity}</>
          )
        }
      />
    </FormGroup>
  );
}
