import { useState, useCallback, useEffect } from "react";
import tagsService from "../api/tagsApi";
import type { SelectorType } from "../types";

export function useFetchTags(type: SelectorType) {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTags = useCallback(async (name: SelectorType) => {
    setLoading(true);
    let isActive = true; // mount flag inside effect to prevent stale state updates

    try {
      let response;
      switch (name) {
        case "meal":
          response = await tagsService.getMealTags();
          break;
        case "recipe_type":
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
      console.error(`Failed to fetch ${name} tags`, err);
    } finally {
      if (isActive) setLoading(false);
    }
    return () => {
      isActive = false;
    }; // stops any async updates after unmount
  }, []);

  useEffect(() => {
    let isActive = true; // mount flag inside effect to prevent stale state updates

    const handler = setTimeout(() => {
      if (!isActive) return;

      if (type) {
        fetchTags(type);
      } else {
        setOptions([]);
      }
    }, 500);
    return () => {
      isActive = false; // stops any async updates after unmount
      clearTimeout(handler); // clears pending timeout
    };
  }, [type, fetchTags]);

  return { options, loading };
}
