import { useEffect, useState } from "react";
import tagsService from "../../api/tagsApi";
import { FormGroup, FormLabel } from "@mui/material";

type SelectorType = "meal" | "recipeType" | "cuisine" | "dietary";

interface TagSelectorProps {
    type: SelectorType;
    label: string;
    multiple?: boolean;
    selectedValues: string[];
    onChange: (values: string[]) => void;
}

export default function TagSelector({
    type,
    label,
    multiple = true,
    selectedValues,
    onChange
}: TagSelectorProps) {
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                let response;
                switch (type) {
                    case "meal":
                        response = await tagsService.getMealTags();
                        break;
                    case "recipeType":
                        response = await tagsService.getRecipeTypeTags();
                        break;
                    case "cuisine":
                        response = await tagsService.getCuisineTags();
                        break;
                    case "dietary":
                        response = await tagsService.getDietaryTags();
                        break;
                    default:
                        throw new Error("Unknown tag type");
                }
                setOptions(response.data);
            } catch (err) {
                console.error(`Failed to fetch ${type} tags`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, [type]);

    const handleChange = (tag: string) => {
        if (multiple) {
            onChange(
                selectedValues.includes(tag)
                    ? selectedValues.filter(v=> v !== tag)
                    : [...selectedValues, tag]
            );
        } else {
            onChange([tag]);
        }
    };

    if (loading) return <p>Loading {label}...</p>

    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            {options.map(tag => (
                <label key={tag} style={{ display: "block" }}>
                    <input 
                        type={multiple ? "checkbox" : "radio"}
                        value={tag}
                        checked={selectedValues.includes(tag)}
                        onChange={() => handleChange(tag)}
                    />
                    {tag}
                </label>
            ))}
        </FormGroup>
    )
}