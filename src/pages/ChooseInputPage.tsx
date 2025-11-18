import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import recipeService from "../api/recipeApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDraftRecipe } from "../react-redux/slices/draftRecipeSlice";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import CircularProgress from "@mui/material/CircularProgress";
import Loading from "../components/Loading";

export function ChooseInputPage() {
  const [recipeUrl, setRecipeUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidUrl = (input: string) => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmitUrl = async (url: string) => {
    if (!isValidUrl(url)) {
      setErrorMessage("Please enter a valid URL.");
      return;
    }
    setErrorMessage("");
    try {
      // set page to loading
      setLoading(true);
      const response = await recipeService.postScrapedRecipe(url);
      const draftRecipe = response.data;
      // store draft recipe in Redux
      dispatch(setDraftRecipe(draftRecipe));
      // navigate to form page
      navigate("/add");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to get recipe. Please try again.");
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ padding: "20%" }}
      flexDirection="row"
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: "60vw",
        }}
      >
        <Grid
          container
          spacing={3}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Grid size={{ xs: 12, sm: 4, md: 4 }} alignContent="center">
            <Button
              id="navigate-add-recipe"
              variant="contained"
              onClick={() => navigate("/add")}
            >
              Add Recipe Manually →
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 8 }} justifyContent="center">
            {loading && <Loading />}
            <Stack spacing={3}>
              <TextField
                type="text"
                placeholder="Add a URL here"
                multiline
                name="url"
                // sx={{ width:"100%", maxWidth: 600}}
                value={recipeUrl}
                onChange={(e) => setRecipeUrl(e.target.value)}
                error={!!errorMessage}
              />
              {errorMessage && (
                <Typography variant="body2" color="error">
                  {errorMessage}
                </Typography>
              )}
              <Button
                id="submit-url-button"
                type="submit"
                variant="contained"
                disabled={recipeUrl === ""}
                onClick={() => handleSubmitUrl(recipeUrl)}
                sx={{ width: "35%" }}
              >
                Submit URL
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
