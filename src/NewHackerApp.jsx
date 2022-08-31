import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { AllStoriesComponent } from "./components/AllStoriesComponent";
import { FavesComponent } from "./components/FavesComponent";
import { grey } from "@mui/material/colors";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider, } from "@mui/material/styles";
export const NewHackerApp = () => {
  const [tabState, setTabState] = React.useState("all");

  const handleActiveTab = (tab) => {
    setTabState(tab);
  };
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const theme = createTheme();

  theme.typography.h4 = {
    fontSize: "1.3rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className="Rectangle-2-Copy"
        
      >
        <Toolbar >
          <ThemeProvider theme={theme}>
            <Typography
              variant="h4"
              component="div"
              sx={{  color: grey[900], fontFamily: "Raleway" }}
            >
              HACKER NEWS
            </Typography>
          </ThemeProvider>
        </Toolbar>
      </AppBar>

      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <ToggleButtonGroup
                className="Rectangle"
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton
                  value="all"
                  onClick={() => handleActiveTab("all")}
                >
                  All
                </ToggleButton>
                <ToggleButton
                  value="faves"
                  onClick={() => handleActiveTab("faves")}
                >
                  Faves
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Container>
        </Box>

        {tabState === "all" ? <AllStoriesComponent /> : <FavesComponent />}
      </main>
    </Box>
  );
};
